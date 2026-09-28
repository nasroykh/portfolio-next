import { z } from "zod";
import { OpenRouterQuery, OpenRouterStream } from "@/app/api/utils/openrouter";
import { keywordSearchQdrantVectors, qdrant } from "@/app/api/utils/qdrant";
import { COLLECTION_NAME } from "@/app/api/utils/init_db";
import {
	BASE_SYSTEM_PROMPT,
	PROMPT_ENHANCEMENT_SYSTEM_PROMPT,
} from "@/app/api/const/system_prompts";
import {
	CHAT_MAX_HISTORY_MESSAGE_LENGTH,
	CHAT_MAX_MESSAGES,
	CHAT_MAX_PROMPT_LENGTH,
	type ChatMessage,
} from "@/lib/chat";
import { isRateLimited } from "@/app/api/utils/rate-limit";

export const dynamic = "force-dynamic";

const CONTEXT_LIMIT = 3;
const MIN_KEYWORD_LENGTH = 3;

// Roles are restricted so a client cannot inject its own "system" instructions
const chatRequestSchema = z.object({
	prompt: z.string().trim().min(1).max(CHAT_MAX_PROMPT_LENGTH),
	messages: z
		.array(
			z.object({
				role: z.enum(["user", "assistant"]),
				// Long assistant replies are trimmed rather than rejected so one verbose answer
				// cannot make every follow-up request fail
				content: z
					.string()
					.max(CHAT_MAX_HISTORY_MESSAGE_LENGTH * 5)
					.transform((text) => text.slice(0, CHAT_MAX_HISTORY_MESSAGE_LENGTH)),
			}),
		)
		.max(CHAT_MAX_MESSAGES),
});

const errorResponse = (message: string, status: number) =>
	Response.json({ success: false, message }, { status });

// Header holding the real client address when a CDN sits in front of the proxy
// (e.g. "cf-connecting-ip" behind Cloudflare). Only trustworthy if the origin is not reachable directly.
const CLIENT_IP_HEADER = process.env.CLIENT_IP_HEADER?.trim().toLowerCase();

// The left-most X-Forwarded-For entry is client-controlled; prefer the address set by our own
// reverse proxy (X-Real-IP), then the right-most hop, which the nearest proxy appended.
const getClientIp = (request: Request) =>
	(CLIENT_IP_HEADER && request.headers.get(CLIENT_IP_HEADER)?.trim()) ||
	request.headers.get("x-real-ip")?.trim() ||
	request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() ||
	"unknown";

const toKeywords = (text: string) => [
	...new Set(
		text
			.toLowerCase()
			.split(/[^\p{L}\p{N}+#.-]+/u)
			.filter((word) => word.length >= MIN_KEYWORD_LENGTH),
	),
];

const prepareSystemPrompt = async (messages: ChatMessage[], prompt: string) => {
	const conversation =
		messages
			.slice(-3)
			.map((message) => `- ${message.role}: ${message.content}`)
			.join("\n") + `\n- user: ${prompt}`;

	try {
		const enhancedPrompt = await OpenRouterQuery(
			{
				model: "gemini25FlashLite",
				maxTokens: 500,
				temperature: 0.3,
				reasoningEffort: "minimal",
			},
			undefined,
			PROMPT_ENHANCEMENT_SYSTEM_PROMPT,
			conversation,
		);

		if (enhancedPrompt.trim() === "null") {
			return BASE_SYSTEM_PROMPT;
		}

		const keywords = toKeywords(enhancedPrompt);
		if (keywords.length === 0) {
			return BASE_SYSTEM_PROMPT;
		}

		const searchResult = await keywordSearchQdrantVectors(
			qdrant,
			COLLECTION_NAME,
			keywords.map((value) => ({ field: "text", value })),
			CONTEXT_LIMIT,
		);

		const context = searchResult.points
			.map((point) => point.payload?.text)
			.filter((text): text is string => typeof text === "string" && !!text)
			.join("\n\n");

		if (!context.trim()) {
			return BASE_SYSTEM_PROMPT;
		}

		return `${BASE_SYSTEM_PROMPT}

## RELEVANT CONTEXT ABOUT NAS:
${context}

Use the above context to provide accurate, specific answers. If the context doesn't contain information needed to answer a question, acknowledge that and suggest they contact Nas directly or check his portfolio website.`;
	} catch (error) {
		// Retrieval is best-effort: answer from the base prompt rather than failing the chat
		console.error("Context retrieval failed:", error);
		return BASE_SYSTEM_PROMPT;
	}
};

export async function POST(request: Request) {
	if (isRateLimited(getClientIp(request))) {
		return errorResponse("Too many requests. Please try again later.", 429);
	}

	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return errorResponse("Invalid JSON body", 400);
	}

	const parsed = chatRequestSchema.safeParse(body);
	if (!parsed.success) {
		return errorResponse("Invalid chat request", 400);
	}

	const { prompt, messages } = parsed.data;

	try {
		const systemPrompt = await prepareSystemPrompt(messages, prompt);

		const stream = await OpenRouterStream(
			{
				model: "gemini25FlashLite",
				maxTokens: 1000,
				temperature: 0.2,
				reasoningEffort: "minimal",
			},
			messages,
			systemPrompt,
			prompt,
			request.signal,
		);

		const encoder = new TextEncoder();
		const send = (
			controller: ReadableStreamDefaultController,
			data: Record<string, unknown>,
		) => controller.enqueue(encoder.encode(JSON.stringify(data) + "\n"));

		const readableStream = new ReadableStream({
			async start(controller) {
				try {
					for await (const chunk of stream) {
						const content = chunk.choices[0]?.delta?.content;
						if (content) send(controller, { content });
					}
					send(controller, { done: true });
				} catch (error) {
					if (!request.signal.aborted) {
						console.error("Chat stream failed:", error);
						send(controller, { error: "Stream interrupted" });
					}
				} finally {
					try {
						controller.close();
					} catch {
						// Already closed because the client cancelled the stream
					}
				}
			},
			cancel() {
				stream.controller.abort();
			},
		});

		return new Response(readableStream, {
			headers: {
				"Content-Type": "application/x-ndjson; charset=utf-8",
				"Cache-Control": "no-cache, no-transform",
				"X-Accel-Buffering": "no",
			},
		});
	} catch (error) {
		console.error("Chat request failed:", error);
		return errorResponse("The assistant is unavailable right now.", 502);
	}
}
