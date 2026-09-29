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
import { projects, type ProjectItem } from "@/data/projects";
import { SITE_URL } from "@/lib/site";

export const COLLECTION_NAME = "nas_portfolio";
export const EMBEDDING_MODEL: keyof typeof OPENROUTER_EMBEDDING_MODELS =
	"openaiTextEmbedding3Small";
export const VECTOR_SIZE = 1536;

/** Plain-text profile entry for one project, embedded alongside NAS.md. */
export const projectDocument = (project: ProjectItem) => {
	const cs = project.caseStudy;
	const lines = [
		`Project: ${project.title}`,
		`Case study page: ${SITE_URL}/projects/${project.id}`,
		`Category: ${project.category}. Status: ${project.status}. Year: ${project.year}.`,
		`What it solves: ${project.whatItSolves}`,
		`Tech stack: ${project.techStack.map((tech) => tech.name).join(", ")}`,
		`Key achievement: ${project.keyAchievement}`,
		`Source code: ${project.codeUrl}`,
		`Summary: ${cs.headline}`,
		`Challenge: ${cs.snapshot.challenge}`,
		`Situation: ${cs.situation}`,
		`Task: ${cs.task}`,
		`What Nas built: ${cs.action.join(" ")}`,
		`Results: ${cs.results
			.map((metric) =>
				metric.before
					? `${metric.label}: ${metric.before} -> ${metric.after}`
					: `${metric.label}: ${metric.after}`,
			)
			.join("; ")}. ${cs.resultSummary}`,
		...project.faqs.map((faq) => `Q: ${faq.question} A: ${faq.answer}`),
	];
	return lines.join("\n");
};

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

	// Projects come from src/data/projects.ts (the same data the site renders), so the assistant
	// can answer about them without a second copy in NAS.md
	const projectChunks = (
		await Promise.all(
			projects.map(async (project) => {
				const parts = await textSplitter.splitText(projectDocument(project));
				// Every chunk names its project so keyword search still matches split case studies
				return parts.map((part, i) =>
					i === 0 ? part : `Project: ${project.title}\n${part}`,
				);
			}),
		)
	).flat();

	const chunks = [...(await textSplitter.splitText(profile)), ...projectChunks];
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
