import { QdrantClient } from "@qdrant/js-client-rest";

export const qdrant = new QdrantClient({ host: "localhost", port: 6333 });

export const checkIfCollectionExists = async (
	client: QdrantClient,
	name: string
) => {
	const { exists } = await client.collectionExists(name);
	return exists;
};

export const createQdrantCollection = async (
	client: QdrantClient,
	name: string,
	size: 1536 | 3072 = 1536
) => {
	const exists = await checkIfCollectionExists(client, name);
	if (exists) return;

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

	console.log("Collection created in Qdrant");
};

export const deleteQdrantCollection = async (
	client: QdrantClient,
	name: string
) => {
	const exists = await checkIfCollectionExists(client, name);
	if (!exists) return;

	await client.deleteCollection(name);
	await client.deletePayloadIndex(name, "text");
	await client.deletePayloadIndex(name, "timestamp");
	console.log("Collection deleted from Qdrant");
};

export const addQdrantVectors = async (
	client: QdrantClient,
	collection: string,
	vectors: {
		id: string;
		vector: number[];
		payload: {
			text: string;
			timestamp: string;
		};
	}[]
) => {
	const exists = await checkIfCollectionExists(client, collection);
	if (!exists) {
		await createQdrantCollection(client, collection);
	}

	await client.upsert(collection, {
		points: vectors,
	});

	console.log("Vectors added to Qdrant");
};

export const semanticSearchQdrantVectors = async (
	client: QdrantClient,
	collection: string,
	query: number[],
	limit: number = 4,
	score_threshold: number = 0.5
) => {
	const exists = await checkIfCollectionExists(client, collection);
	if (!exists) {
		await createQdrantCollection(client, collection);
	}

	const result = await client.query(collection, {
		query,
		limit,
		score_threshold,
		with_payload: true,
	});
	return result;
};

export const keywordSearchQdrantVectors = async (
	client: QdrantClient,
	collection: string,
	query: { field: string; value: string }[],
	limit: number = 4
) => {
	const exists = await checkIfCollectionExists(client, collection);
	if (!exists) {
		await createQdrantCollection(client, collection);
	}

	const result = await client.scroll(collection, {
		filter: {
			should: query.map((q) => ({
				key: q.field,
				match: {
					text: q.value,
				},
			})),
		},
		limit,
		with_payload: true,
	});

	return result;
};
