import { OpenRouterEmbed, OpenRouterQuery } from "@/app/api/utils/openrouter";
import {
	keywordSearchQdrantVectors,
	qdrant,
	semanticSearchQdrantVectors,
} from "@/app/api/utils/qdrant";
import {
	COLLECTION_NAME,
	EMBEDDING_MODEL,
	initDB,
} from "@/app/api/utils/init_db";
import {
	BASE_SYSTEM_PROMPT,
	PROMPT_ENHANCEMENT_SYSTEM_PROMPT,
} from "@/app/api/const/system_prompts";
import path from "path";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { promises as fs } from "fs";
import { getTokenCount } from "./utils";

const prepareSystemPrompt = async (
	messages: { role: string; content: string }[],
	prompt: string
) => {
	const scoreThreshold = 0.4;
	const contextLimit = 3;
	let context = "";

	const messagesPrompt =
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
				stream: false,
			},
			undefined,
			PROMPT_ENHANCEMENT_SYSTEM_PROMPT,
			messagesPrompt
		);

		console.log("Enhanced prompt: ", enhancedPrompt);

		if (
			!enhancedPrompt ||
			typeof enhancedPrompt !== "string" ||
			enhancedPrompt.trim() === "null"
		) {
			return BASE_SYSTEM_PROMPT;
		}

		// const embeddedPrompt = await OpenRouterEmbed(
		// 	EMBEDDING_MODEL,
		// 	enhancedPrompt
		// );

		// const searchResult = await semanticSearchQdrantVectors(
		// 	qdrant,
		// 	"nas_portfolio",
		// 	embeddedPrompt,
		// 	contextLimit,
		// 	scoreThreshold
		// );

		const searchResult = await keywordSearchQdrantVectors(
			qdrant,
			COLLECTION_NAME,
			enhancedPrompt.split(" ").map((word) => ({ field: "text", value: word })),
			contextLimit
		);

		console.log(searchResult.points);

		// const filteredSearchResult = searchResult.points.filter(
		// 	(point) => point.score >= scoreThreshold && point.payload?.text
		// );

		const filteredSearchResult = searchResult.points.filter(
			(point) => point.payload?.text
		);

		context = filteredSearchResult
			.map((point) => point.payload?.text)
			.join("\n\n");
	} catch (error) {
		console.log(error);
	}

	return `${BASE_SYSTEM_PROMPT}

${
	context && context.trim()
		? `## RELEVANT CONTEXT ABOUT NAS:
	${context}
	
Use the above context to provide accurate, specific answers. If the context doesn't contain information needed to answer a question, acknowledge that and suggest they contact Nas directly or check his portfolio website.`
		: ""
}`;
};

export async function POST(request: Request) {
	try {
		const { prompt, messages } = await request.json();

		if (!prompt || !messages) {
			return Response.json({
				success: false,
				message: "Prompt and messages are required",
			});
		}

		if (prompt.length > 500) {
			return Response.json({
				success: false,
				message:
					"Prompt is too long. Please shorten it to 500 characters or less.",
			});
		}

		if (messages.length > 10) {
			return Response.json({
				success: false,
				message: "Messages limit reached",
			});
		}

		const systemPrompt = await prepareSystemPrompt(messages, prompt);

		const stream = await OpenRouterQuery(
			{
				model: "gemini25FlashLite",
				maxTokens: 1000,
				temperature: 0.2,
				reasoningEffort: "minimal",
				stream: true,
			},
			messages,
			systemPrompt,
			prompt
		);

		const encoder = new TextEncoder();
		const readableStream = new ReadableStream({
			async start(controller) {
				try {
					for await (const chunk of stream) {
						if (typeof chunk === "string") continue;
						const content = chunk.choices[0]?.delta?.content || "";
						if (content) {
							// Send each chunk as a JSON string
							const data = JSON.stringify({ content }) + "\n";
							controller.enqueue(encoder.encode(data));
						}
					}
					// Send final message when done
					controller.enqueue(
						encoder.encode(JSON.stringify({ done: true }) + "\n")
					);
					controller.close();
				} catch (error) {
					controller.error(error);
				}
			},
		});

		return new Response(readableStream, {
			headers: {
				"Content-Type": "text/event-stream",
				"Cache-Control": "no-cache",
				Connection: "keep-alive",
			},
		});
	} catch (error) {
		return Response.json({
			success: false,
			message: "Error: " + error,
		});
	}
}
