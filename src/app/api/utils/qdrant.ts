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
	console.log("Collection created in Qdrant");
};

export const deleteQdrantCollection = async (
	client: QdrantClient,
	name: string
) => {
	const exists = await checkIfCollectionExists(client, name);
	if (!exists) return;

	await client.deleteCollection(name);
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
			type: string;
			title: string;
		};
	}[]
) => {
	const exists = await checkIfCollectionExists(client, collection);
	if (!exists) {
		await createQdrantCollection(client, collection);
	}

	await client
		.upsert(collection, {
			points: vectors,
		})
		.catch((error) => {
			console.log(error.data);
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
	console.log("Vectors searched in Qdrant", result);
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
					value: q.value,
				},
			})),
		},
		limit,
		with_payload: true,
	});

	console.log("Vectors searched in Qdrant", result);
	return result;
};
