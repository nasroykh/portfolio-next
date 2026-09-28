import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import {
	createQdrantCollection,
	qdrant,
	addQdrantVectors,
	deleteQdrantCollection,
	type QdrantPoint,
} from "./qdrant";
import { OPENROUTER_EMBEDDING_MODELS, OpenRouterEmbed } from "./openrouter";
import { getTokenCount } from ".";

export const COLLECTION_NAME = "nas_portfolio";
export const EMBEDDING_MODEL: keyof typeof OPENROUTER_EMBEDDING_MODELS =
	"openaiTextEmbedding3Small";
export const VECTOR_SIZE = 1536;

export const initDB = async () => {
	const profile = await fs.readFile(
		path.join(process.cwd(), "NAS.md"),
		"utf8",
	);

	const textSplitter = new RecursiveCharacterTextSplitter({
		chunkSize: 500,
		chunkOverlap: 100,
		lengthFunction: getTokenCount,
	});

	const chunks = await textSplitter.splitText(profile);
	const timestamp = new Date().toISOString();

	// Embed before touching the collection so a failed embedding call does not leave it empty
	const points: QdrantPoint[] = await Promise.all(
		chunks.map(async (text) => ({
			id: randomUUID(),
			vector: await OpenRouterEmbed(EMBEDDING_MODEL, text),
			payload: { text, timestamp },
		})),
	);

	await deleteQdrantCollection(qdrant, COLLECTION_NAME);
	await createQdrantCollection(qdrant, COLLECTION_NAME, VECTOR_SIZE);
	await addQdrantVectors(qdrant, COLLECTION_NAME, points);

	return { vectors: points.length };
};
