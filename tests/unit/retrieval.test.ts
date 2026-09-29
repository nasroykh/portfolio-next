import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
	embed: vi.fn(),
	semantic: vi.fn(),
	keyword: vi.fn(),
}));

vi.mock("@/app/api/utils/openrouter", () => ({ OpenRouterEmbed: mocks.embed }));
vi.mock("@/app/api/utils/qdrant", () => ({
	qdrant: {},
	semanticSearchQdrantVectors: mocks.semantic,
	keywordSearchQdrantVectors: mocks.keyword,
}));
vi.mock("@/app/api/utils/init_db", () => ({
	COLLECTION_NAME: "test",
	EMBEDDING_MODEL: "openaiTextEmbedding3Small",
}));

const { retrieveContext, toKeywords } = await import("@/app/api/utils/retrieval");

const points = (...texts: string[]) => ({
	points: texts.map((text) => ({ payload: { text } })),
});

beforeEach(() => {
	mocks.embed.mockResolvedValue([0.1, 0.2]);
	mocks.semantic.mockResolvedValue(points("semantic hit"));
	mocks.keyword.mockResolvedValue(points("keyword hit"));
	vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
	vi.unstubAllEnvs();
	vi.clearAllMocks();
});

describe("toKeywords", () => {
	it("lowercases, dedupes and drops short words", () => {
		expect(toKeywords("Nas RAG rag Next.js at Qdrant")).toEqual(["nas", "rag", "next.js", "qdrant"]);
	});
});

describe("retrieveContext", () => {
	it("uses keyword search by default", async () => {
		expect(await retrieveContext("stripe payments")).toEqual(["keyword hit"]);
		expect(mocks.embed).not.toHaveBeenCalled();
	});

	it("uses semantic search when RAG_SEARCH=semantic", async () => {
		vi.stubEnv("RAG_SEARCH", "semantic");
		expect(await retrieveContext("stripe payments")).toEqual(["semantic hit"]);
		expect(mocks.keyword).not.toHaveBeenCalled();
	});

	it("falls back to keywords when nothing passes the threshold", async () => {
		vi.stubEnv("RAG_SEARCH", "semantic");
		mocks.semantic.mockResolvedValue(points());
		expect(await retrieveContext("stripe payments")).toEqual(["keyword hit"]);
	});

	it("falls back to keywords when embedding fails", async () => {
		vi.stubEnv("RAG_SEARCH", "semantic");
		mocks.embed.mockRejectedValue(new Error("openrouter down"));
		expect(await retrieveContext("stripe payments")).toEqual(["keyword hit"]);
	});

	it("skips the search when the query has no usable keywords", async () => {
		expect(await retrieveContext("a an")).toEqual([]);
		expect(mocks.keyword).not.toHaveBeenCalled();
	});
});
