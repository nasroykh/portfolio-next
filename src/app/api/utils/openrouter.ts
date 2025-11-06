import OpenAI from "openai";
import { type ReasoningEffort } from "openai/resources";

export const OPENROUTER_AI_MODELS = {
	claude4_5: "anthropic/claude-sonnet-4.5",
	gemini25Flash: "google/gemini-2.5-flash",
	gemini25Pro: "google/gemini-2.5-pro",
	gemini25FlashLite: "google/gemini-2.5-flash-lite",
	gemini20Flash: "google/gemini-2.0-flash-001",
	gemma3_12b: "google/gemma-3-12b-it",
	gemma3_27b: "google/gemma-3-27b-it",
	gpt5: "openai/gpt-5",
	gpt5Mini: "openai/gpt-5-mini",
	gpt5Nano: "openai/gpt-5-nano",
	gptOss20b: "openai/gpt-oss-20b",
	gptOss120b: "openai/gpt-oss-120b",
	grok4Fast: "x-ai/grok-4-fast",
	grok3Mini: "x-ai/grok-3-mini",
	llama4Scout: "meta-llama/llama-4-scout",
	llama4Maverick: "meta-llama/llama-4-maverick",
	hermes4_405b: "nousresearch/hermes-4-405b",
	hermes4_70b: "nousresearch/hermes-4-70b",
	deepSeekChatV31: "deepseek/deepseek-chat-v3.1",
	kimiK20905: "moonshotai/kimi-k2-0905",
	glm46: "z-ai/glm-4.6",
	glm45Air: "z-ai/glm-4.5-air",
} as const;

export const OPENROUTER_EMBEDDING_MODELS = {
	openaiTextEmbedding3Small: "openai/text-embedding-3-small",
	openaiTextEmbedding3Large: "openai/text-embedding-3-large",
	googleGeminiEmbedding001: "google/gemini-embedding-001",
} as const;

export const DEFAULT_OPENROUTER_MODEL = OPENROUTER_AI_MODELS.gemini25FlashLite;

export const DEFAULT_TEMPERATURE = 1.0;
export const DEFAULT_MAX_TOKENS = 500;
export const DEFAULT_REASONING_EFFORT: ReasoningEffort = "minimal";

if (!process.env.OPENROUTER_API_KEY) {
	throw new Error("OPENROUTER_API_KEY is not set");
}

const openai = new OpenAI({
	baseURL: "https://openrouter.ai/api/v1",
	apiKey: process.env.OPENROUTER_API_KEY,
	defaultHeaders: {
		"HTTP-Referer": process.env.APP_URL || "https://nascodes.dev", // Optional. Site URL for rankings on openrouter.ai.
		"X-Title": "Nas Portfolio | Software Engineer & AI/LLM Specialist", // Optional. Site title for rankings on openrouter.ai.
	},
});

type AISettings = {
	model: keyof typeof OPENROUTER_AI_MODELS;
	temperature: number;
	maxTokens: number;
	reasoningEffort: ReasoningEffort;
	stream?: boolean;
};

export const OpenRouterQuery = async (
	settings: AISettings,
	chatHistory?: OpenAI.ChatCompletionMessageParam[],
	systemPrompt?: string,
	prompt?: string
) => {
	try {
		const messages = chatHistory ? [...chatHistory] : [];

		if (systemPrompt && systemPrompt.trim()) {
			messages.unshift({ role: "system", content: systemPrompt });
		}

		if (prompt && prompt.trim()) {
			messages.push({ role: "user", content: prompt });
		} else {
			throw new Error("Prompt is required");
		}

		if (messages.length === 0) {
			throw new Error("No messages provided");
		}

		if (settings.temperature && settings.temperature !== 0) {
			if (settings.temperature < 0 || settings.temperature > 2) {
				throw new Error("Temperature must be between 0 and 2");
			}
		}

		if (settings.maxTokens && settings.maxTokens <= 0) {
			throw new Error("Max tokens must be greater than 0");
		}

		if (settings.stream && settings.stream === true) {
			const stream = await openai.chat.completions.create({
				messages,
				model: OPENROUTER_AI_MODELS[settings.model] || DEFAULT_OPENROUTER_MODEL,
				temperature: settings.temperature || DEFAULT_TEMPERATURE,
				max_completion_tokens: settings.maxTokens || DEFAULT_MAX_TOKENS,
				reasoning_effort:
					(settings.reasoningEffort as ReasoningEffort) ||
					DEFAULT_REASONING_EFFORT,
				stream: true,
			});

			return stream;
		} else {
			const { choices } = await openai.chat.completions.create({
				messages,
				model: OPENROUTER_AI_MODELS[settings.model] || DEFAULT_OPENROUTER_MODEL,
				temperature: settings.temperature || DEFAULT_TEMPERATURE,
				max_completion_tokens: settings.maxTokens || DEFAULT_MAX_TOKENS,
				reasoning_effort:
					(settings.reasoningEffort as ReasoningEffort) ||
					DEFAULT_REASONING_EFFORT,
			});

			if (choices.length <= 0) {
				throw new Error("No choices returned from completion");
			}

			if (!choices[0]?.message.content) {
				throw new Error("No message returned from completion");
			}

			return choices[0].message.content;
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const OpenRouterEmbed = async (
	model: keyof typeof OPENROUTER_EMBEDDING_MODELS,
	text: string
) => {
	try {
		let dimensions = 3072;
		if (model === "openaiTextEmbedding3Small") {
			dimensions = 1536;
		} else if (model === "googleGeminiEmbedding001") {
			dimensions = 3072;
		}

		const embedding = await openai.embeddings.create({
			model: OPENROUTER_EMBEDDING_MODELS[model],
			input: text,
			dimensions,
			encoding_format: "float",
		});

		if (!embedding?.data?.length) {
			throw new Error("No embedding returned from completion");
		}

		return embedding.data[0].embedding;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
