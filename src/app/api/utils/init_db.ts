import { promises as fs } from "fs";
import path from "path";
import {
	createQdrantCollection,
	qdrant,
	addQdrantVectors,
	deleteQdrantCollection,
} from "./qdrant";
import { OPENROUTER_EMBEDDING_MODELS, OpenRouterEmbed } from "./openrouter";
import { randomUUID } from "crypto";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { getTokenCount } from ".";

export const COLLECTION_NAME = "nas_portfolio";
export const EMBEDDING_MODEL =
	"openaiTextEmbedding3Small" as keyof typeof OPENROUTER_EMBEDDING_MODELS;
export const VECTOR_SIZE = 1536;

export const initDB = async () => {
	try {
		console.log("🚀 Initializing Qdrant database...");

		// Create collection with appropriate vector dimensions
		await deleteQdrantCollection(qdrant, COLLECTION_NAME);
		await createQdrantCollection(qdrant, COLLECTION_NAME, VECTOR_SIZE);

		const points: {
			id: string;
			vector: number[];
			payload: { text: string; timestamp: string };
		}[] = [];

		// Process static content
		console.log("📝 Processing static content...");

		const NASDOTMD = await fs.readFile(
			path.join(process.cwd(), "NAS.md"),
			"utf8"
		);

		const textSplitter = new RecursiveCharacterTextSplitter({
			chunkSize: 500,
			chunkOverlap: 100,
			lengthFunction: getTokenCount,
		});

		const chunks = await textSplitter.splitText(NASDOTMD);

		for (let i = 0; i < chunks.length; i++) {
			points.push({
				id: randomUUID(),
				vector: await OpenRouterEmbed(EMBEDDING_MODEL, chunks[i]),
				payload: {
					text: chunks[i],
					timestamp: new Date().toISOString(),
				},
			});
		}

		// Add all points to Qdrant
		console.log(`💾 Adding ${points.length} vectors to Qdrant...`);
		await addQdrantVectors(qdrant, COLLECTION_NAME, points);

		console.log("✅ Database initialization complete!");
		console.log(`📊 Total vectors indexed: ${points.length}`);
	} catch (error) {
		console.error("❌ Database initialization failed:", error);
		throw error;
	}
};
