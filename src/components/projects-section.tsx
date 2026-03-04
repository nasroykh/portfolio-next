"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconBrandGithub, IconCheck, IconCopy } from "@tabler/icons-react";
import { useState } from "react";

type TechItem = {
	name: string;
};

type FaqItem = {
	question: string;
	answer: string;
};

type ProjectItem = {
	id: string;
	title: string;
	whatItSolves: string;
	techStack: TechItem[];
	keyAchievement: string;
	codeUrl: string;
	caseStudyUrl: string;
	faqs: FaqItem[];
	bootstrapCommand?: string;
};

const projects: ProjectItem[] = [
	{
		id: "website-template",
		title: "Website Template",
		whatItSolves:
			"Accelerates delivery of production websites with a repeatable starter architecture for developer productivity and boilerplate efficiency.",
		techStack: [
			{ name: "React" },
			{ name: "Next.js" },
			{ name: "TypeScript" },
			{ name: "Tailwind CSS" },
			{ name: "Shadcn UI" },
			{ name: "Docker" },
		],
		keyAchievement:
			"Reduced initial setup time from weeks to a few hours while keeping launch-ready quality checks consistent across new projects.",
		codeUrl: "https://github.com/nasroykh/website_template",
		caseStudyUrl: "/projects#website-template",
		bootstrapCommand: "npx foxmayn-cli website [directory]",
		faqs: [
			{
				question: "Who is this built for?",
				answer:
					"Frontend-heavy teams needing faster delivery of portfolio, marketing, and SaaS frontends without reinventing baseline tooling.",
			},
			{
				question: "What was the biggest bottleneck it solves?",
				answer:
					"It eliminated repetitive setup decisions and prevented inconsistent folder structure, linting, and deployment conventions across projects.",
			},
			{
				question: "How is quality preserved while being fast?",
				answer:
					"With standardized linting, format checks, and production-minded conventions at the template boundary before local launch.",
			},
		],
	},
	{
		id: "app-template",
		title: "App Template",
		whatItSolves:
			"Provides a full-stack foundation focused on reliability through Turborepo architecture, reusable packages, and robust local-to-production parity.",
		techStack: [
			{ name: "Node.js" },
			{ name: "Hono" },
			{ name: "oRPC" },
			{ name: "PostgreSQL" },
			{ name: "Drizzle ORM" },
			{ name: "Docker" },
			{ name: "Turborepo" },
		],
		keyAchievement:
			"Reduced integration regressions by enforcing clear service boundaries and shared schema contracts across apps, APIs, and worker processes.",
		codeUrl: "https://github.com/nasroykh/app_template",
		caseStudyUrl: "/projects#app-template",
		bootstrapCommand: "npx foxmayn-cli app [directory]",
		faqs: [
			{
				question: "Why Turborepo?",
				answer:
					"It centralizes task orchestration and caching, making multi-package refactors and dependency updates safer across the stack.",
			},
			{
				question: "How does this improve developer reliability?",
				answer:
					"Consistent conventions and reproducible containers reduce divergence between local, CI, and production behavior.",
			},
			{
				question: "Is this team scalable?",
				answer:
					"Yes. Shared interfaces and explicit package boundaries minimize cognitive overhead when new engineers onboard into complex application lines.",
			},
		],
	},
	{
		id: "foxmayn-ai",
		title: "Foxmayn AI",
		whatItSolves:
			"Delivers enterprise-grade RAG and LLM orchestration workflows for retrieval-grounded responses with auditable output quality.",
		techStack: [
			{ name: "PostgreSQL" },
			{ name: "Docker" },
			{ name: "RAG" },
			{ name: "Qdrant" },
			{ name: "Redis/BullMQ" },
			{ name: "OpenRouter" },
		],
		keyAchievement:
			"Reduced hallucinated outputs by adding retrieval checkpoints and reranking logic before final synthesis, increasing answer precision in enterprise use cases.",
		codeUrl: "https://github.com/nasroykh/foxmayn_ai",
		caseStudyUrl: "/projects#foxmayn-ai",
		faqs: [
			{
				question: "How are generated answers grounded?",
				answer:
					"Queries are routed through retrieval, reranking, and context injection before model completion, so results remain tied to source data.",
			},
			{
				question: "What safeguards are included?",
				answer:
					"Source-aware prompts and post-generation validation flow keep responses auditable and easier to monitor in production.",
			},
			{
				question: "What business outcome does this unlock?",
				answer:
					"It enables safe internal copilots and documentation agents while reducing time spent validating knowledge retrieval at scale.",
			},
		],
	},
];

function BootstrapCode({ command }: { command: string }) {
	const [copied, setCopied] = useState(false);

	const copyToClipboard = async () => {
		await navigator.clipboard.writeText(command);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-900 rounded-xs px-3 py-2 w-fit group/code">
					<code className="text-xs font-mono text-neutral-600 dark:text-neutral-400">
						{command}
					</code>
					<button
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							copyToClipboard();
						}}
						className="text-neutral-400 hover:text-primary transition-colors cursor-pointer"
						aria-label="Copy command"
					>
						{copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
					</button>
				</div>
			</TooltipTrigger>
			<TooltipContent side="bottom" className="text-[10px] uppercase tracking-widest font-bold">
				{copied ? "Copied!" : "Click to copy bootstrap command"}
			</TooltipContent>
		</Tooltip>
	);
}

function ProjectCard({ project }: { project: ProjectItem }) {
	return (
		<div
			id={project.id}
			className="group flex flex-col border-b last:border-b-0 border-neutral-200 dark:border-neutral-800 py-12 sm:py-16"
		>
			<div className="flex flex-col md:flex-row gap-8 md:gap-12">
				{/* Left: Content */}
				<div className="flex-1 space-y-6">
					<div className="space-y-2">
						<h3 className="text-2xl font-semibold tracking-tight">
							{project.title}
						</h3>
						<p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
							{project.whatItSolves}
						</p>
					</div>

					<div className="space-y-4">
						<div className="flex flex-wrap gap-2">
							{project.techStack.map((tech) => {
								return (
									<Badge
										key={tech.name}
										variant="outline"
										className="cursor-pointer hover:animate-pulse hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold border-current/20"
									>
										{tech.name}
									</Badge>
								);
							})}
						</div>

						<div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
							<p className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-500 mb-2">
								Key Achievement
							</p>
							<p className="text-sm text-neutral-700 dark:text-neutral-300">
								{project.keyAchievement}
							</p>
						</div>
					</div>

					<div className="flex flex-wrap items-center gap-3 pt-2">
						<Button asChild variant="default" size="sm" className="rounded-xs">
							<a
								href={project.codeUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="gap-2"
							>
								<IconBrandGithub size={16} />
								View Code
							</a>
						</Button>
						{project.bootstrapCommand && (
							<BootstrapCode command={project.bootstrapCommand} />
						)}
					</div>
				</div>

				{/* Right: FAQs */}
				<div className="w-full md:w-80 shrink-0">
					<p className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-500 mb-4">
						Common Questions
					</p>
					<Accordion type="single" collapsible className="w-full">
						{project.faqs.map((faq, index) => (
							<AccordionItem key={index} value={`item-${index}`}>
								<AccordionTrigger className="text-xs py-3 hover:no-underline">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
									{faq.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</div>
	);
}

export function ProjectsSection() {
	return (
		<div className="space-y-4">
			<div className="grid gap-0">
				{projects.map((project) => (
					<ProjectCard key={project.id} project={project} />
				))}
			</div>
		</div>
	);
}
