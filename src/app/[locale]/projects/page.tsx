import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { Layout } from "@/components/layout/layout";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProjectsExplorer } from "@/components/projects-explorer";
import { projects, toProjectSummary } from "@/data/projects";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "meta" });

	return pageMetadata({
		title: t("projectsTitle"),
		description: t("projectsDescription"),
		path: "/projects",
		locale,
	});
}

export default async function ProjectsPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations("projects");

	return (
		<Layout>
			<section className="space-y-4">
				<div className="space-y-2">
					<h1 className="font-semibold text-3xl md:text-4xl tracking-tighter">
						{t("pageTitle")}
					</h1>
					<p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
						{t("intro")}
					</p>
				</div>
				<ProjectsExplorer projects={projects.map(toProjectSummary)} />
			</section>
		</Layout>
	);
}
