import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
	ArrowLeft,
	CheckCircle2,
	ArrowRight,
	Layers,
	Target,
	Wrench,
	BarChart3,
} from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";

import { Layout } from "@/components/layout/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { projects } from "@/data/projects";

type Props = {
	params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
	return projects.map((project) => ({
		slug: project.id,
	}));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const project = projects.find((p) => p.id === slug);

	if (!project) return { title: "Project Not Found" };

	return {
		title: `${project.title} — Case Study`,
		description: project.caseStudy.headline,
	};
}

export default async function ProjectCaseStudyPage({ params }: Props) {
	const { slug } = await params;
	const project = projects.find((p) => p.id === slug);

	if (!project) notFound();

	const t = await getTranslations("caseStudy");
	const cs = project.caseStudy;

	const currentIndex = projects.findIndex((p) => p.id === slug);
	const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
	const nextProject =
		currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

	return (
		<Layout activePath="projects">
			<article className="space-y-10">
				{/* Breadcrumb */}
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/projects">
								{t("projects")}
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>{project.title}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				{/* Header */}
				<header className="space-y-4">
					<div className="flex flex-wrap items-center gap-2">
						<Badge
							variant="outline"
							className="text-[10px] font-mono uppercase"
						>
							{project.category}
						</Badge>
						<Badge
							variant={
								project.status === "production" ? "default" : "secondary"
							}
							className="text-[10px]"
						>
							{project.status === "production"
								? t("statusProduction")
								: project.status === "in-progress"
									? t("statusInProgress")
									: t("statusArchived")}
						</Badge>
						<span className="text-xs text-muted-foreground font-mono">
							{project.year}
						</span>
					</div>

					<h1 className="font-semibold text-3xl md:text-4xl tracking-tighter">
						{project.title}
					</h1>

					<p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
						{cs.headline}
					</p>

					<div className="flex flex-wrap gap-3 pt-2">
						<Button size="sm" variant="outline" className="gap-2" asChild>
							<a href={project.codeUrl} target="_blank" rel="noreferrer">
								<IconBrandGithub className="size-4" />
								{t("viewSource")}
							</a>
						</Button>
						{project.bootstrapCommand && (
							<Badge
								variant="secondary"
								className="font-mono text-xs px-3 py-1.5"
							>
								{project.bootstrapCommand}
							</Badge>
						)}
					</div>
				</header>

				{/* Snapshot Box */}
				<div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-card/40 backdrop-blur-sm p-6 space-y-4">
					<h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
						{t("atAGlance")}
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div className="space-y-1">
							<p className="text-xs text-muted-foreground font-medium">
								{t("challenge")}
							</p>
							<p className="text-sm">{cs.snapshot.challenge}</p>
						</div>
						<div className="space-y-1">
							<p className="text-xs text-muted-foreground font-medium">
								{t("result")}
							</p>
							<p className="text-sm">{cs.snapshot.result}</p>
						</div>
						<div className="space-y-1">
							<p className="text-xs text-muted-foreground font-medium">
								{t("techStack")}
							</p>
							<div className="flex flex-wrap gap-1.5">
								{project.techStack.map((tech) => (
									<Badge
										key={tech.name}
										variant="secondary"
										className="text-[10px] bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border-none px-2 py-0"
									>
										{tech.name}
									</Badge>
								))}
							</div>
						</div>
						<div className="space-y-1">
							<p className="text-xs text-muted-foreground font-medium">
								{t("status")}
							</p>
							<p className="text-sm capitalize">{project.status}</p>
						</div>
					</div>
				</div>

				{/* Images */}
				{project.images && project.images.length > 0 && (
					<div className="rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800">
						<Carousel className="w-full">
							<CarouselContent>
								{project.images.map((image, i) => (
									<CarouselItem key={i}>
										<AspectRatio ratio={16 / 9}>
											<Image
												src={image}
												alt={`${project.title} screenshot ${i + 1}`}
												fill
												className="object-cover"
											/>
										</AspectRatio>
									</CarouselItem>
								))}
							</CarouselContent>
							{project.images.length > 1 && (
								<>
									<CarouselPrevious className="left-2 bg-background/80 backdrop-blur-sm size-8" />
									<CarouselNext className="right-2 bg-background/80 backdrop-blur-sm size-8" />
								</>
							)}
						</Carousel>
					</div>
				)}

				{/* STAR Sections */}
				<div className="space-y-10">
					{/* Situation */}
					<section className="space-y-3">
						<div className="flex items-center gap-2">
							<Layers className="size-5 text-primary" />
							<h2 className="text-xl font-semibold tracking-tight">
								{t("situation")}
							</h2>
						</div>
						<p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
							{cs.situation}
						</p>
					</section>

					<Separator />

					{/* Task */}
					<section className="space-y-3">
						<div className="flex items-center gap-2">
							<Target className="size-5 text-primary" />
							<h2 className="text-xl font-semibold tracking-tight">
								{t("task")}
							</h2>
						</div>
						<p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
							{cs.task}
						</p>
					</section>

					<Separator />

					{/* Action */}
					<section className="space-y-4">
						<div className="flex items-center gap-2">
							<Wrench className="size-5 text-primary" />
							<h2 className="text-xl font-semibold tracking-tight">
								{t("action")}
							</h2>
						</div>
						<ul className="space-y-3">
							{cs.action.map((step, i) => (
								<li key={i} className="flex gap-3">
									<CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
									<p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
										{step}
									</p>
								</li>
							))}
						</ul>
					</section>

					<Separator />

					{/* Results */}
					<section className="space-y-4">
						<div className="flex items-center gap-2">
							<BarChart3 className="size-5 text-primary" />
							<h2 className="text-xl font-semibold tracking-tight">
								{t("results")}
							</h2>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{cs.results.map((metric, i) => (
								<div
									key={i}
									className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 space-y-2 bg-card/40"
								>
									<p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
										{metric.label}
									</p>
									{metric.before && (
										<p className="text-sm text-neutral-500 line-through">
											{metric.before}
										</p>
									)}
									<p className="text-lg font-semibold text-primary">
										{metric.after}
									</p>
								</div>
							))}
						</div>

						<p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pt-2">
							{cs.resultSummary}
						</p>
					</section>
				</div>

				<Separator />

				{/* Key Achievement */}
				<section className="rounded-lg border border-primary/20 bg-primary/5 p-6 space-y-2">
					<h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
						{t("keyAchievement")}
					</h3>
					<p className="text-sm leading-relaxed">
						{project.keyAchievement}
					</p>
				</section>

				{/* FAQs */}
				{project.faqs.length > 0 && (
					<section className="space-y-4">
						<h2 className="text-xl font-semibold tracking-tight">
							{t("faq")}
						</h2>
						<Accordion type="single" collapsible className="w-full">
							{project.faqs.map((faq, i) => (
								<AccordionItem key={i} value={`faq-${i}`}>
									<AccordionTrigger>{faq.question}</AccordionTrigger>
									<AccordionContent>
										<p className="text-neutral-600 dark:text-neutral-400">
											{faq.answer}
										</p>
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</section>
				)}

				<Separator />

				{/* Navigation */}
				<nav className="flex items-center justify-between">
					{prevProject ? (
						<Button variant="ghost" size="sm" className="gap-2" asChild>
							<Link href={`/projects/${prevProject.id}`}>
								<ArrowLeft className="size-4" />
								<span className="hidden sm:inline">{prevProject.title}</span>
								<span className="sm:hidden">{t("prev")}</span>
							</Link>
						</Button>
					) : (
						<div />
					)}

					<Button variant="outline" size="sm" asChild>
						<Link href="/projects">{t("allProjects")}</Link>
					</Button>

					{nextProject ? (
						<Button variant="ghost" size="sm" className="gap-2" asChild>
							<Link href={`/projects/${nextProject.id}`}>
								<span className="hidden sm:inline">{nextProject.title}</span>
								<span className="sm:hidden">{t("next")}</span>
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					) : (
						<div />
					)}
				</nav>
			</article>
		</Layout>
	);
}
