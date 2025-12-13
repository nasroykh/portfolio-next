"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { IconArrowLeft } from "@tabler/icons-react";
import { Download } from "lucide-react";
import Link from "next/link";

export default function ResumePage() {
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
							Export as PDF
						</Button>
					</div>
					<div className="hidden md:block">
						<ThemeToggle />
					</div>
				</div>

				{/* Resume Content */}
				<div className="bg-card rounded-lg shadow-sm border p-8 md:p-12 print:shadow-none print:border-0">
					{/* Header */}
					<div className="mb-8 pb-6 border-b">
						<h1 className="text-4xl font-bold mb-2">
							Nasr Eddine Yakhou (Nas)
						</h1>
						<p className="text-xl text-muted-foreground mb-4">
							Software Engineer - AI/LLM Specialist
						</p>
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
						<h2 className="text-2xl font-bold mb-3">Professional Summary</h2>
						<p className="text-muted-foreground leading-relaxed">
							5+ years of experience as a Software engineer specializing in
							enterprise software, ERPs, AI integration, and full-stack
							development. I build applications that solve real business
							problems—balancing speed with scalability based on what the
							project actually needs.
						</p>
					</section>

					{/* Technical Skills */}
					<section className="mb-8">
						<h2 className="text-2xl font-bold mb-3">Technical Skills</h2>
						<div className="grid md:grid-cols-2 gap-4 text-sm">
							<div>
								<h3 className="font-semibold mb-2">Frontend</h3>
								<p className="text-muted-foreground">
									Next.js, React, Svelte, TypeScript, Tailwind CSS, Shadcn UI,
									Tanstack Query, Zustand, Jotai
								</p>
							</div>
							<div>
								<h3 className="font-semibold mb-2">Backend</h3>
								<p className="text-muted-foreground">
									Node.js, Fastify, tRPC, Go, Python, Drizzle ORM, Prisma,
									PostgreSQL, Redis, Qdrant, MongoDB, BullMQ
								</p>
							</div>
							<div>
								<h3 className="font-semibold mb-2">AI & Tools</h3>
								<p className="text-muted-foreground">
									Anthropic, OpenRouter, OpenAI, Google Gemini, LangChain,
									Playwright, Docker, Stripe, GraphQL
								</p>
							</div>
							<div>
								<h3 className="font-semibold mb-2">Infrastructure</h3>
								<p className="text-muted-foreground">
									Linux, NGINX, Caddy, AWS, Docker, Jest, CI/CD, Git
								</p>
							</div>
						</div>
					</section>

					{/* Work Experience */}
					<section className="mb-8">
						<h2 className="text-2xl font-bold mb-4">Work Experience</h2>

						<div className="space-y-6">
							{/* KB Développement */}
							<div>
								<div className="flex justify-between items-start mb-2">
									<div>
										<h3 className="text-lg font-semibold">Software Engineer</h3>
										<p className="text-muted-foreground">KB Développement</p>
									</div>
									<span className="text-sm text-muted-foreground whitespace-nowrap">
										Nov 2025 - Present
									</span>
								</div>
								<ul className="text-sm text-muted-foreground space-y-1 ml-4">
									<li>
										• Developing and enhancing ERP systems with specialized
										accounting modules and AI integration using OpenAI and
										Anthropic LLMs
									</li>
									<li>
										• Building full-stack features with React, Python and
										PostgreSQL databases
									</li>
									<li>
										• Implementing intelligent automation to streamline
										accounting workflows and business processes
									</li>
								</ul>
							</div>

							{/* VexLogic */}
							<div>
								<div className="flex justify-between items-start mb-2">
									<div>
										<h3 className="text-lg font-semibold">
											AI/LLM Specialist & Lead Developer
										</h3>
										<p className="text-muted-foreground">
											VexLogic Ltd · vexlogic.com
										</p>
									</div>
									<span className="text-sm text-muted-foreground whitespace-nowrap">
										Apr 2025 - Nov 2025
									</span>
								</div>
								<ul className="text-sm text-muted-foreground space-y-1 ml-4">
									<li>
										• Built RAG systems for natural language querying of
										proprietary documents with vector embeddings and semantic
										search
									</li>
									<li>
										• Developed intelligent automation tools: web scraping
										pipelines with Playwright + LLMs and AI-powered cold email
										system with A/B testing that significantly boosted
										conversions
									</li>
									<li>
										• Created custom AI assistants using OpenRouter for customer
										support and workflow automation
									</li>
								</ul>
							</div>

							{/* Tech4Fab */}
							<div className="break-after-page">
								<div className="flex justify-between items-start mb-2">
									<div>
										<h3 className="text-lg font-semibold">
											Full Stack Developer
										</h3>
										<p className="text-muted-foreground">
											Tech4Fab · tech4fab.com
										</p>
									</div>
									<span className="text-sm text-muted-foreground whitespace-nowrap">
										Jun 2024 - Apr 2025
									</span>
								</div>
								<ul className="text-sm text-muted-foreground space-y-1 ml-4">
									<li>
										• Built drag-and-drop widget builder with real-time data
										visualization for custom dashboards
									</li>
									<li>
										• Implemented filtering, sorting, and customization features
										with backend infrastructure for widget configurations
									</li>
								</ul>
							</div>

							{/* Techivation */}
							<div className="print:pt-12 print:max-w-4xl print:mx-auto">
								<div className="flex justify-between items-start mb-2">
									<div>
										<h3 className="text-lg font-semibold">
											IT Specialist & Lead Developer
										</h3>
										<p className="text-muted-foreground">
											Techivation Ltd · techivation.com
										</p>
									</div>
									<span className="text-sm text-muted-foreground whitespace-nowrap">
										Sep 2021 - Dec 2023
									</span>
								</div>
								<ul className="text-sm text-muted-foreground space-y-1 ml-4">
									<li>
										• Built full-stack eCommerce platform from scratch: RESTful
										API, PostgreSQL database, and Stripe/PayPal integration with
										automated license delivery
									</li>
									<li>
										• Drove 40%+ organic traffic increase through SEO strategy
										and improved page speed from 60s to 95+ via Core Web Vitals
										optimization
									</li>
									<li>
										• Led team of 3 developers, established CI/CD workflows and
										development best practices
									</li>
								</ul>
							</div>

							{/* SoliderSound */}
							<div>
								<div className="flex justify-between items-start mb-2">
									<div>
										<h3 className="text-lg font-semibold">Lead Developer</h3>
										<p className="text-muted-foreground">
											SoliderSound Ltd · solidersound.com
										</p>
									</div>
									<span className="text-sm text-muted-foreground whitespace-nowrap">
										Apr 2023 - Dec 2023
									</span>
								</div>
								<ul className="text-sm text-muted-foreground space-y-1 ml-4">
									<li>
										• Built eCommerce platform with Node.js, PostgreSQL, and
										Next.js—achieved first-page rankings through technical SEO
										and cut page load times by 50%
									</li>
									<li>
										• Led team of 2 developers and established Git workflows
									</li>
								</ul>
							</div>

							{/* BRENCO */}
							<div>
								<div className="flex justify-between items-start mb-2">
									<div>
										<h3 className="text-lg font-semibold">
											Full Stack Developer
										</h3>
										<p className="text-muted-foreground">
											BRENCO Engineering & Consulting · brenco-algerie.com
										</p>
									</div>
									<span className="text-sm text-muted-foreground whitespace-nowrap">
										Aug 2021 - Feb 2022
									</span>
								</div>
								<ul className="text-sm text-muted-foreground space-y-1 ml-4">
									<li>
										• Worked on multiple client projects with cross-functional
										teams—built monitoring systems, maintained IoT APIs, and
										converted sites to React
									</li>
								</ul>
							</div>
						</div>
					</section>
				</div>
			</div>
		</>
	);
}
