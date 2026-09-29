import { OpenRouterEmbed } from "./openrouter";
import {
	keywordSearchQdrantVectors,
	qdrant,
	semanticSearchQdrantVectors,
} from "./qdrant";
import { COLLECTION_NAME, EMBEDDING_MODEL } from "./init_db";

const CONTEXT_LIMIT = 3;
const MIN_KEYWORD_LENGTH = 3;
// text-embedding-3-small cosine scores for relevant chunks usually sit around 0.3-0.5;
// untuned starting point, adjust after checking real queries
const SEMANTIC_SCORE_THRESHOLD = 0.3;

export const toKeywords = (text: string) => [
	...new Set(
		text
			.toLowerCase()
			.split(/[^\p{L}\p{N}+#.-]+/u)
			.filter((word) => word.length >= MIN_KEYWORD_LENGTH),
	),
];

type Payload = Record<string, unknown> | null | undefined;
const payloadTexts = (points: { payload?: Payload }[]) =>
	points
		.map((point) => point.payload?.text)
		.filter((text): text is string => typeof text === "string" && !!text);

const keywordContext = async (query: string) => {
	const keywords = toKeywords(query);
	if (keywords.length === 0) return [];

	const { points } = await keywordSearchQdrantVectors(
		qdrant,
		COLLECTION_NAME,
		keywords.map((value) => ({ field: "text", value })),
		CONTEXT_LIMIT,
	);
	return payloadTexts(points);
};

/**
 * Profile chunks relevant to the query.
 * RAG_SEARCH=semantic ranks chunks by embedding similarity (one extra embedding call per message)
 * and falls back to keywords when nothing passes the threshold or the call fails. Otherwise the
 * keyword filter is used, which returns matches in storage order, not by relevance.
 */
export const retrieveContext = async (query: string) => {
	if (process.env.RAG_SEARCH !== "semantic") return keywordContext(query);

	try {
		// Must use the same embedding model the collection was built with (see init_db.ts)
		const vector = await OpenRouterEmbed(EMBEDDING_MODEL, query);
		const { points } = await semanticSearchQdrantVectors(
			qdrant,
			COLLECTION_NAME,
			vector,
			CONTEXT_LIMIT,
			SEMANTIC_SCORE_THRESHOLD,
		);
		const texts = payloadTexts(points);
		return texts.length > 0 ? texts : keywordContext(query);
	} catch (error) {
		console.error("Semantic search failed, falling back to keywords:", error);
		return keywordContext(query);
	}
};
