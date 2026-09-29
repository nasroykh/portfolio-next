import { describe, expect, it, vi } from "vitest";
import { projects } from "@/data/projects";

// Only the pure document builder is under test: no embeddings, no Qdrant
vi.mock("@/app/api/utils/openrouter", () => ({
	OPENROUTER_EMBEDDING_MODELS: {},
	OpenRouterEmbed: vi.fn(),
}));
vi.mock("@/app/api/utils/qdrant", () => ({}));

const { projectDocument } = await import("@/app/api/utils/init_db");

describe("projectDocument", () => {
	it.each(projects.map((project) => [project.title, project] as const))(
		"describes %s with the facts the assistant needs",
		(_, project) => {
			const doc = projectDocument(project);

			expect(doc.startsWith(`Project: ${project.title}\n`)).toBe(true);
			expect(doc).toContain(`/projects/${project.id}`);
			expect(doc).toContain(project.codeUrl);
			for (const tech of project.techStack) expect(doc).toContain(tech.name);
			expect(doc).toContain(project.caseStudy.headline);
			expect(doc).not.toContain("undefined");
		},
	);
});
