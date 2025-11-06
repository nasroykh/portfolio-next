import { Layout } from "@/components/layout/layout";

export const metadata = {
	title: "Experience",
	description:
		"Professional experience in AI/LLM development, eCommerce platforms, SEO optimization, and full-stack engineering.",
};

const experiences = [
	{
		id: "vexlogic",
		companyName: "VexLogic Ltd",
		dateRange: "April 2025 - Present",
		role: "AI/LLM Specialist & Lead Developer",
		description:
			"Specialize in building production-ready AI solutions with a focus on RAG systems, custom AI assistants, and intelligent automation tools. Work directly with OpenAI, Anthropic, and other LLM APIs to create practical business applications that leverage the latest advancements in generative AI.",
		achievements: [
			"Architected and deployed custom RAG (Retrieval-Augmented Generation) systems enabling natural language querying of proprietary documents and knowledge bases using vector embeddings and semantic search",
			"Built intelligent web scraping and data extraction pipelines with Puppeteer and Playwright, integrated with LLMs for automated content analysis and structured data extraction",
			"Developed AI assistants and chatbots using OpenRouter, OpenAI, and Anthropic APIs for customer support, internal tooling, and workflow automation",
			"Created an AI-powered cold email system with automated personalization, A/B testing, and iterative improvement based on engagement metrics—significantly increasing conversion rates",
			"Implemented prompt engineering strategies, few-shot learning patterns, and chain-of-thought reasoning for improved AI response quality and reliability",
		],
		website: "https://vexlogic.com",
	},
	{
		id: "tech4fab",
		companyName: "Tech4Fab",
		dateRange: "June 2024 - April 2025",
		role: "Full Stack Developer",
		description:
			"Developed and improved a widget builder platform that lets companies create custom dashboards to visualize their data. Worked on both the drag-and-drop interface and the backend systems.",
		achievements: [
			"Built a flexible widget builder with drag-and-drop functionality for creating custom dashboards",
			"Created real-time data visualization components that update dynamically as data changes",
			"Developed the backend infrastructure to handle custom widget configurations and data processing",
		],
	},
	{
		id: "techivation",
		companyName: "Techivation Ltd",
		dateRange: "September 2021 - December 2023",
		role: "IT Specialist & Lead Developer",
		description:
			"Led end-to-end development of a high-performance eCommerce platform for a UK-based audio software company. Architected scalable backend infrastructure, implemented payment processing, and drove significant SEO improvements that directly increased organic traffic and revenue.",
		achievements: [
			"Architected and built RESTful API and PostgreSQL database from scratch, handling products, licensing, orders, and customer management with optimized query performance",
			"Implemented comprehensive SEO strategy combining technical optimizations (server-side rendering, semantic HTML, schema markup) and content improvements—driving 40%+ increase in organic traffic",
			"Integrated Stripe and PayPal payment gateways with subscription management, webhooks for automated license delivery, and fraud prevention measures",
			"Developed custom interactive A/B audio player allowing customers to compare processed vs unprocessed audio in real-time, significantly improving conversion rates",
			"Built comprehensive admin dashboards with analytics, inventory management, order processing, and customer support tools using React and TypeScript",
			"Optimized Core Web Vitals through lazy loading, image optimization, and strategic code splitting—improving page speed scores from 60s to 90+",
			"Led and mentored a team of 3 junior developers, conducted code reviews, and established development best practices and CI/CD workflows",
		],
		website: "https://techivation.com",
	},
	{
		id: "solidersound",
		companyName: "SoliderSound Ltd",
		dateRange: "April 2023 - December 2023",
		role: "Lead Developer",
		description:
			"Architected and developed a complete eCommerce solution for an audio plugin company, managing full-stack development from database design to frontend implementation. Led development team and implemented technical SEO strategies that improved search rankings and page performance.",
		achievements: [
			"Built scalable eCommerce platform from ground up with Node.js backend, PostgreSQL database, and Next.js frontend with server-side rendering for optimal SEO",
			"Implemented technical SEO best practices including structured data markup, XML sitemaps, canonical URLs, and Open Graph tags—achieving first-page rankings for key product terms",
			"Integrated Stripe and PayPal payment processing with automated license key generation and email delivery workflows",
			"Optimized site performance through CDN integration, asset compression, and database query optimization—reducing average page load time by 50%",
			"Led development team of 2 developers, established Git workflows, and maintained project timelines while coordinating with stakeholders",
			"Built responsive product pages with dynamic filtering and search functionality, improving user experience and reducing bounce rates",
		],
		website: "https://solidersound.com",
	},
	{
		id: "brenco",
		companyName: "BRENCO Engineering & Consulting",
		dateRange: "August 2021 - February 2022",
		role: "Full Stack Developer",
		description:
			"My first full-time developer role. Worked on multiple projects at once, collaborating with managers, designers, and other developers on various client projects.",
		achievements: [
			"Worked with cross-functional teams on different client projects simultaneously",
			"Maintained and improved IoT API infrastructure for connected devices",
			"Converted traditional websites into React-based interactive applications",
			"Built and deployed monitoring systems to track server health and performance",
			"Developed custom websites for startups in the company's incubator program",
			"Helped interview and onboard new developers joining the team",
		],
	},
	{
		id: "freelancing",
		companyName: "Freelancing / Personal Projects",
		dateRange: "Before August 2021",
		role: "Freelance Web Developer",
		description:
			"Spent about 8 months learning web development and applying what I learned through freelance projects and personal work. This gave me hands-on experience before landing my first full-time role.",
		achievements: [
			"Took on various freelance web development projects for local clients",
			"Learned Shopify theme development and built a few custom themes",
			"Built personal projects to practice front-end development skills",
			"Created a real-time chat application using React and WebSockets",
			"Developed an employee management system as my computer science thesis project",
			"Built a patient management system for a local medical center",
		],
		website: "https://old.nascodes.dev",
	},
];

const skills = {
	frontEnd: [
		"Next.js",
		"React",
		"Svelte",
		"Tailwind CSS",
		"Tanstack Query",
		"Tanstack Router",
		"SCSS",
		"Shadcn UI",
		"Jotai",
		"Zustand",
		"Vite",
	],
	backEnd: [
		"Node.js",
		"Fastify",
		"TRPC",
		"Go",
		"Python",
		"Drizzle ORM",
		"Prisma",
		"PostgreSQL",
		"Redis",
		"MongoDB",
		"BullMQ",
	],
	toolsAndTechnologies: [
		"OpenAI",
		"Google Gemini",
		"OpenRouter",
		"Puppeteer",
		"Playwright",
		"Docker",
		"Linux",
		"Stripe",
		"Electron",
		"Figma",
		"C++",
		"Jest",
		"NGINX",
		"Caddy",
		"PayPal",
		"GraphQL",
		"AWS",
	],
};

export default function ExperiencePage() {
	return (
		<Layout activePath="experience">
			<section>
				<h1 className="font-semibold text-xl sm:text-2xl md:text-3xl mb-6 md:mb-8 tracking-tighter">
					Work Experience
				</h1>
				<div className="mb-8 p-3 sm:p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
					<p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
						<strong className="text-neutral-900 dark:text-neutral-100">
							Core Specializations:
						</strong>{" "}
						AI/LLM Development (RAG Systems, Prompt Engineering, AI Assistants)
						• eCommerce Platforms (Payment Integration, API Design, Database
						Architecture) • SEO Optimization (Technical SEO, Performance,
						Content Strategy)
					</p>
				</div>
				<div className="space-y-12">
					{experiences.map((experience) => (
						<div key={experience.id} className="flex flex-col">
							<div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2 gap-1 sm:gap-2">
								<h2 className="font-medium text-lg sm:text-xl tracking-tight">
									{experience.role}
								</h2>
								<p className="text-sm text-neutral-600 dark:text-neutral-400">
									{experience.dateRange}
								</p>
							</div>
							<p className="text-neutral-700 dark:text-neutral-300 mb-2 font-medium">
								{experience.companyName}
							</p>
							<p className="text-neutral-600 dark:text-neutral-400 mb-3">
								{experience.description}
							</p>
							<div className="mt-2">
								<p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
									Key Achievements:
								</p>
								<ul className="list-disc list-outside ml-4 sm:ml-5 space-y-1.5 text-sm text-neutral-600 dark:text-neutral-400">
									{experience.achievements.map((achievement, idx) => (
										<li key={idx} className="pl-1">
											{achievement}
										</li>
									))}
								</ul>
							</div>
							{experience.website && (
								<a
									href={experience.website}
									target="_blank"
									rel="noopener noreferrer"
									className="mt-3 text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors underline"
								>
									Visit website →
								</a>
							)}
						</div>
					))}
				</div>

				<div className="mt-12 md:mt-16">
					<h2 className="font-semibold text-lg sm:text-xl mb-4 sm:mb-6 tracking-tighter">
						Technical Skills
					</h2>
					<div className="space-y-6">
						<div>
							<h3 className="font-medium text-base mb-3 text-neutral-700 dark:text-neutral-300">
								Front-End Development
							</h3>
							<div className="flex flex-wrap gap-2">
								{skills.frontEnd.map((skill) => (
									<span
										key={skill}
										className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-md"
									>
										{skill}
									</span>
								))}
							</div>
						</div>
						<div>
							<h3 className="font-medium text-base mb-3 text-neutral-700 dark:text-neutral-300">
								Back-End Development
							</h3>
							<div className="flex flex-wrap gap-2">
								{skills.backEnd.map((skill) => (
									<span
										key={skill}
										className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-md"
									>
										{skill}
									</span>
								))}
							</div>
						</div>
						<div>
							<h3 className="font-medium text-base mb-3 text-neutral-700 dark:text-neutral-300">
								Tools & Technologies
							</h3>
							<div className="flex flex-wrap gap-2">
								{skills.toolsAndTechnologies.map((skill) => (
									<span
										key={skill}
										className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-md"
									>
										{skill}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
}
