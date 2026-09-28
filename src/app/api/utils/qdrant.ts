import { QdrantClient } from "@qdrant/js-client-rest";

export type QdrantPoint = {
	id: string;
	vector: number[];
	payload: {
		text: string;
		timestamp: string;
	};
};

export const qdrant = new QdrantClient({
	url: process.env.QDRANT_URL || "http://localhost:6333",
	apiKey: process.env.QDRANT_API_KEY || undefined,
	// Skip the version round-trip at construction time (it also runs during `next build`)
	checkCompatibility: false,
});

export const checkIfCollectionExists = async (
	client: QdrantClient,
	name: string,
) => {
	const { exists } = await client.collectionExists(name);
	return exists;
};

export const createQdrantCollection = async (
	client: QdrantClient,
	name: string,
	size: 1536 | 3072 = 1536,
) => {
	if (await checkIfCollectionExists(client, name)) return;

	await client.createCollection(name, {
		vectors: { size, distance: "Cosine" },
	});

	await client.createPayloadIndex(name, {
		field_name: "text",
		field_schema: "text",
	});

	await client.createPayloadIndex(name, {
		field_name: "timestamp",
		field_schema: "datetime",
	});
};

export const deleteQdrantCollection = async (
	client: QdrantClient,
	name: string,
) => {
	if (!(await checkIfCollectionExists(client, name))) return;

	// Payload indexes are dropped together with the collection
	await client.deleteCollection(name);
};

export const addQdrantVectors = async (
	client: QdrantClient,
	collection: string,
	points: QdrantPoint[],
) => {
	await client.upsert(collection, { wait: true, points });
};

export const semanticSearchQdrantVectors = async (
	client: QdrantClient,
	collection: string,
	query: number[],
	limit = 4,
	score_threshold = 0.5,
) =>
	client.query(collection, {
		query,
		limit,
		score_threshold,
		with_payload: true,
	});

export const keywordSearchQdrantVectors = async (
	client: QdrantClient,
	collection: string,
	query: { field: string; value: string }[],
	limit = 4,
) =>
	client.scroll(collection, {
		filter: {
			should: query.map((q) => ({
				key: q.field,
				match: { text: q.value },
			})),
		},
		limit,
		with_payload: true,
	});
