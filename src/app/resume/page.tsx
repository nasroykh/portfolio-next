"use client";

import { SettingsDropdown } from "@/components/settings-dropdown";
import { Button } from "@/components/ui/button";
import { IconArrowLeft } from "@tabler/icons-react";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

type ResumeExperience = {
	translationKey: string;
	company: string;
	breakAfter?: boolean;
	printClass?: string;
};

const resumeExperiences: ResumeExperience[] = [
	{
		translationKey: "kbDeveloppement",
		company: "KB Développement",
	},
	{
		translationKey: "vexlogic",
		company: "VexLogic Ltd · vexlogic.com",
	},
	{
		translationKey: "tech4fab",
		company: "Tech4Fab · tech4fab.com",
		breakAfter: true,
	},
	{
		translationKey: "techivation",
		company: "Techivation Ltd · techivation.com",
		printClass: "print:pt-12 print:max-w-4xl print:mx-auto",
	},
	{
		translationKey: "solidersound",
		company: "SoliderSound Ltd · solidersound.com",
	},
	{
		translationKey: "brenco",
		company: "BRENCO Engineering & Consulting · brenco-algerie.com",
	},
];

export default function ResumePage() {
	const t = useTranslations("resume");

	const handleExportPDF = () => {
		window.print();
	};

	return (
		<>
			<div className="max-w-4xl mx-auto space-y-8 py-8 print:py-0 print:space-y-0">
				{/* Export Button - Hidden in print */}
				<div className="flex justify-between items-center gap-4 print:hidden">
					<div className="flex items-center gap-2">
						<Button asChild size="icon">
							<Link href="/">
								<IconArrowLeft className="size-4" />
							</Link>
						</Button>
						<Button onClick={handleExportPDF} className="gap-2">
							<Download className="w-4 h-4" />
							{t("exportPDF")}
						</Button>
					</div>
					<div className="hidden md:block">
						<SettingsDropdown />
					</div>
				</div>

				{/* Resume Content */}
				<div className="bg-card rounded-lg shadow-sm border p-8 md:p-12 print:shadow-none print:border-0">
					{/* Header */}
					<div className="mb-8 pb-6 border-b">
						<h1 className="text-4xl font-bold mb-2">
							Nasr Eddine Yakhou (Nas)
						</h1>
						<p className="text-xl text-muted-foreground mb-4">{t("title")}</p>
						<div className="flex flex-wrap gap-4 text-sm">
							<a
								href="https://github.com/nasroykh"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:underline"
							>
								GitHub
							</a>
							<a
								href="https://www.linkedin.com/in/nas-y/"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:underline"
							>
								LinkedIn
							</a>
							<a
								href="https://medium.com/@nascodes"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:underline"
							>
								Medium
							</a>
							<a
								href="https://instagram.com/nascodes"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:underline"
							>
								Instagram
							</a>
							<a
								href="https://x.com/nas_codes"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:underline"
							>
								X (Twitter)
							</a>
						</div>
					</div>

					{/* Professional Summary */}
					<section className="mb-8">
						<h2 className="text-2xl font-bold mb-3">
							{t("professionalSummary")}
						</h2>
						<p className="text-muted-foreground leading-relaxed">
							{t("professionalSummaryText")}
						</p>
					</section>

					{/* Technical Skills */}
					<section className="mb-8">
						<h2 className="text-2xl font-bold mb-3">{t("technicalSkills")}</h2>
						<div className="grid md:grid-cols-2 gap-4 text-sm">
							<div>
								<h3 className="font-semibold mb-2">{t("frontend")}</h3>
								<p className="text-muted-foreground">
									Next.js, React, Svelte, TypeScript, Tailwind CSS, Shadcn UI,
									Tanstack Query, Zustand, Jotai
								</p>
							</div>
							<div>
								<h3 className="font-semibold mb-2">{t("backend")}</h3>
								<p className="text-muted-foreground">
									Node.js, Fastify, tRPC, Go, Python, Drizzle ORM, Prisma,
									PostgreSQL, Redis, Qdrant, MongoDB, BullMQ
								</p>
							</div>
							<div>
								<h3 className="font-semibold mb-2">{t("aiTools")}</h3>
								<p className="text-muted-foreground">
									Anthropic, OpenRouter, OpenAI, Google Gemini, LangChain,
									Playwright, Docker, Stripe, GraphQL
								</p>
							</div>
							<div>
								<h3 className="font-semibold mb-2">{t("infrastructure")}</h3>
								<p className="text-muted-foreground">
									Linux, NGINX, Caddy, AWS, Docker, Jest, CI/CD, Git
								</p>
							</div>
						</div>
					</section>

					{/* Work Experience */}
					<section className="mb-8">
						<h2 className="text-2xl font-bold mb-4">{t("workExperience")}</h2>

						<div className="space-y-6">
							{resumeExperiences.map((exp) => {
								const role = t(`${exp.translationKey}.role`);
								const dateRange = t(`${exp.translationKey}.dateRange`);
								const achievementsRaw = t.raw(
									`${exp.translationKey}.achievements`
								) as string[];

								return (
									<div
										key={exp.translationKey}
										className={`${exp.breakAfter ? "break-after-page" : ""} ${
											exp.printClass || ""
										}`}
									>
										<div className="flex justify-between items-start mb-2">
											<div>
												<h3 className="text-lg font-semibold">{role}</h3>
												<p className="text-muted-foreground">{exp.company}</p>
											</div>
											<span className="text-sm text-muted-foreground whitespace-nowrap">
												{dateRange}
											</span>
										</div>
										<ul className="text-sm text-muted-foreground space-y-1 ml-4">
											{achievementsRaw.map((achievement, idx) => (
												<li key={idx}>• {achievement}</li>
											))}
										</ul>
									</div>
								);
							})}
						</div>
					</section>
				</div>
			</div>
		</>
	);
}
