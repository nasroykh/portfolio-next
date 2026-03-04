import { Layout } from "@/components/layout/layout";
import { getTranslations } from "next-intl/server";
import { ProjectsSection } from "@/components/projects-section";

export const metadata = {
	title: "Projects",
	description:
		"An overview of selected production projects with architecture focus, outcomes, and implementation rationale.",
};

export default async function ProjectsPage() {
	const t = await getTranslations("projects");

	return (
		<Layout activePath="projects">
			<section>
				<h1 className="font-semibold text-3xl md:text-4xl mb-8 tracking-tighter">
					{t("pageTitle")}
				</h1>
				<p className="text-neutral-600 dark:text-neutral-400 mb-6">
					{t("intro")}
				</p>
				<ProjectsSection />
			</section>
		</Layout>
	);
}
