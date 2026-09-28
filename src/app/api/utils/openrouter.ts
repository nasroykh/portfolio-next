import OpenAI from "openai";
import { type ReasoningEffort } from "openai/resources";
import { SITE_URL } from "@/lib/site";

export const OPENROUTER_AI_MODELS = {
	gemini25Flash: "google/gemini-2.5-flash",
	gemini25FlashLite: "google/gemini-2.5-flash-lite",
} as const;

export const OPENROUTER_EMBEDDING_MODELS = {
	openaiTextEmbedding3Small: "openai/text-embedding-3-small",
	openaiTextEmbedding3Large: "openai/text-embedding-3-large",
	googleGeminiEmbedding001: "google/gemini-embedding-001",
} as const;

const EMBEDDING_DIMENSIONS: Record<
	keyof typeof OPENROUTER_EMBEDDING_MODELS,
	number
> = {
	openaiTextEmbedding3Small: 1536,
	openaiTextEmbedding3Large: 3072,
	googleGeminiEmbedding001: 3072,
};

export const DEFAULT_OPENROUTER_MODEL = OPENROUTER_AI_MODELS.gemini25FlashLite;

export const DEFAULT_TEMPERATURE = 1.0;
export const DEFAULT_MAX_TOKENS = 500;
export const DEFAULT_REASONING_EFFORT: ReasoningEffort = "minimal";

let client: OpenAI | null = null;

// Created lazily so a missing key fails the request, not module evaluation (which breaks builds)
const getClient = () => {
	if (client) return client;

	if (!process.env.OPENROUTER_API_KEY) {
		throw new Error("OPENROUTER_API_KEY is not set");
	}

	client = new OpenAI({
		baseURL: "https://openrouter.ai/api/v1",
		apiKey: process.env.OPENROUTER_API_KEY,
		defaultHeaders: {
			// Optional. Used for app attribution/rankings on openrouter.ai
			"HTTP-Referer": SITE_URL,
			"X-Title": "Nas Portfolio | Software Engineer & AI/LLM Specialist",
		},
	});

	return client;
};

type AISettings = {
	model: keyof typeof OPENROUTER_AI_MODELS;
	temperature?: number;
	maxTokens?: number;
	reasoningEffort?: ReasoningEffort;
};

const buildRequest = (
	settings: AISettings,
	chatHistory: OpenAI.ChatCompletionMessageParam[] = [],
	systemPrompt?: string,
	prompt?: string,
) => {
	if (!prompt?.trim()) {
		throw new Error("Prompt is required");
	}

	const temperature = settings.temperature ?? DEFAULT_TEMPERATURE;
	if (temperature < 0 || temperature > 2) {
		throw new Error("Temperature must be between 0 and 2");
	}

	const maxTokens = settings.maxTokens ?? DEFAULT_MAX_TOKENS;
	if (maxTokens <= 0) {
		throw new Error("Max tokens must be greater than 0");
	}

	const messages: OpenAI.ChatCompletionMessageParam[] = [
		...(systemPrompt?.trim()
			? [{ role: "system" as const, content: systemPrompt }]
			: []),
		...chatHistory,
		{ role: "user", content: prompt },
	];

	return {
		messages,
		model: OPENROUTER_AI_MODELS[settings.model] ?? DEFAULT_OPENROUTER_MODEL,
		temperature,
		max_completion_tokens: maxTokens,
		reasoning_effort: settings.reasoningEffort ?? DEFAULT_REASONING_EFFORT,
	};
};

export const OpenRouterQuery = async (
	settings: AISettings,
	chatHistory?: OpenAI.ChatCompletionMessageParam[],
	systemPrompt?: string,
	prompt?: string,
) => {
	const { choices } = await getClient().chat.completions.create(
		buildRequest(settings, chatHistory, systemPrompt, prompt),
	);

	const content = choices[0]?.message.content;
	if (!content) {
		throw new Error("No message returned from completion");
	}

	return content;
};

export const OpenRouterStream = async (
	settings: AISettings,
	chatHistory?: OpenAI.ChatCompletionMessageParam[],
	systemPrompt?: string,
	prompt?: string,
	signal?: AbortSignal,
) =>
	getClient().chat.completions.create(
		{
			...buildRequest(settings, chatHistory, systemPrompt, prompt),
			stream: true,
		},
		{ signal },
	);

export const OpenRouterEmbed = async (
	model: keyof typeof OPENROUTER_EMBEDDING_MODELS,
	text: string,
) => {
	const embedding = await getClient().embeddings.create({
		model: OPENROUTER_EMBEDDING_MODELS[model],
		input: text,
		dimensions: EMBEDDING_DIMENSIONS[model],
		encoding_format: "float",
	});

	if (!embedding?.data?.length) {
		throw new Error("No embedding returned from completion");
	}

	return embedding.data[0].embedding;
};
