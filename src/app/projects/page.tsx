import { Layout } from "@/components/layout/layout";
import { getTranslations } from "next-intl/server";
import { ProjectsExplorer } from "@/components/projects-explorer";

export const metadata = {
	title: "Projects",
	description:
		"An overview of selected production projects with architecture focus, outcomes, and implementation rationale.",
};

export default async function ProjectsPage() {
	const t = await getTranslations("projects");

	return (
		<Layout activePath="projects">
			<section className="space-y-4">
				<div className="space-y-2">
					<h1 className="font-semibold text-3xl md:text-4xl tracking-tighter">
						{t("pageTitle")}
					</h1>
					<p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
						{t("intro")}
					</p>
				</div>
				<ProjectsExplorer />
			</section>
		</Layout>
	);
}
