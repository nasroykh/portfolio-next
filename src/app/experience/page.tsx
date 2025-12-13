import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";

export const metadata = {
	title: "Experience",
	description:
		"Professional experience in AI/LLM development, eCommerce platforms, SEO optimization, and full-stack engineering.",
};

const experiences = [
	{
		id: "kb-developpement",
		companyName: "KB Développement",
		dateRange: "November 2025 - Present",
		role: "Software Engineer",
		description:
			"Building and enhancing enterprise software solutions and ERPs with a focus on accounting systems and AI integration. Working on full-stack development using modern technologies to deliver robust business applications.",
		achievements: [
			"Developing and enhancing enterprise resource planning (ERP) systems with specialized accounting modules",
			"Integrating AI capabilities using OpenAI and Anthropic LLMs to automate and improve business processes",
			"Building full-stack features with React, Python and PostgreSQL databases",
			"Implementing intelligent automation to streamline accounting workflows and data processing",
			"Working on scalable enterprise software architecture for business-critical applications",
		],
		website: [
			{
				title: "Visit Website",
				url: "https://www.kbdev.co/",
			},
			{
				title: "Visit LinkedIn",
				url: "https://www.linkedin.com/company/kb-développement/",
			},
		],
	},
	{
		id: "vexlogic",
		companyName: "VexLogic Ltd",
		dateRange: "April 2025 - November 2025",
		role: "AI/LLM Specialist & Lead Developer",
		description:
			"Specialized in building production-ready AI solutions with a focus on RAG systems, custom AI assistants, and intelligent automation tools. Worked directly with OpenRouter, OpenAI, Qdrant and other tools to create practical business applications that leverage the latest advancements in generative AI.",
		achievements: [
			"Architected and deployed custom RAG (Retrieval-Augmented Generation) systems enabling natural language querying of proprietary documents and knowledge bases using vector embeddings and semantic search",
			"Built intelligent web scraping and data extraction pipelines with Playwright, integrated with LLMs for automated content analysis and structured data extraction",
			"Created an AI-powered cold email system with automated personalization, A/B testing, and iterative improvement based on engagement metrics—significantly increasing conversion rates",
			"Developed AI assistants using OpenRouter API for customer support, internal tooling, and workflow automation",
			"Implemented prompt and context engineering strategies for improved AI response quality and reliability",
		],
		website: [
			{
				title: "Visit Website",
				url: "https://vexlogic.com",
			},
		],
	},
	{
		id: "tech4fab",
		companyName: "Tech4Fab",
		dateRange: "June 2024 - April 2025",
		role: "Full Stack Developer",
		description:
			"Developed and improved a widget builder platform that lets companies create custom dashboards to visualize their data. Worked on both the drag-and-drop interface and the backend systems.",
		achievements: [
			"Built and enhanced a flexible widget builder with drag-and-drop functionality for creating custom dashboards",
			"Created real-time data visualization components that update dynamically as data changes",
			"Implemented filters, customization and sorting functionality for the widget builder",
			"Developed the backend infrastructure to handle custom widget configurations and data processing",
		],
		website: [
			{
				title: "Visit Website",
				url: "https://tech4fab.com",
			},
			{
				title: "Visit LinkedIn",
				url: "https://www.linkedin.com/company/tech4fab/",
			},
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
			"Built comprehensive admin dashboards with analytics, inventory management, order processing, and customer support tools using React and TypeScript",
			"Optimized Core Web Vitals through lazy loading, image optimization, and strategic code splitting—improving page speed scores from 60s to 95+",
			"Led and mentored a team of 3 junior developers, conducted code reviews, and established development best practices and CI/CD workflows",
		],
		website: [
			{
				title: "Visit Website",
				url: "https://techivation.com",
			},
		],
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
		website: [
			{
				title: "Visit Website",
				url: "https://solidersound.com",
			},
		],
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
		website: [
			{
				title: "Visit Website",
				url: "https://brenco-algerie.com/",
			},
			{
				title: "Visit LinkedIn",
				url: "https://www.linkedin.com/company/brenco-engineering-&-consulting-services/",
			},
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
			"Took on various freelance web development projects for local and Upwork clients",
			"Learned Shopify theme development and built a few custom themes",
			"Built personal projects to practice front-end development skills",
			"Created a real-time chat application using React and WebSockets",
			"Developed an employee management system as my computer science thesis project",
			"Built a patient management system for a local medical center",
		],
		website: [
			{
				title: "Visit First Portfolio",
				url: "https://first.nascodes.dev",
			},
			{
				title: "Visit Previous Portfolio",
				url: "https://previous.nascodes.dev",
			},
		],
	},
];

export default function ExperiencePage() {
	return (
		<Layout activePath="experience">
			<section>
				<h1 className="font-semibold text-3xl md:text-4xl mb-8 tracking-tighter">
					Work Experience
				</h1>

				<div className="">
					{experiences.map((experience) => (
						<div
							key={experience.id}
							className="flex flex-col border-b last:border-b-0 first:pt-0 last:pb-6 border-neutral-200 dark:border-neutral-800 py-12 sm:py-14"
						>
							<div className="space-y-2 sm:space-y-0 mb-4">
								<div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-baseline gap-0 sm:gap-2">
									<h2 className="text-2xl tracking-tight">{experience.role}</h2>
									<p className="text-sm text-neutral-600 dark:text-neutral-400">
										{experience.dateRange}
									</p>
								</div>
								<p className="text-foreground/70 font-medium">
									{experience.companyName}
								</p>
							</div>
							<p className="text-neutral-600 dark:text-neutral-400 mb-3">
								{experience.description}
							</p>
							<div className="mt-2">
								<p className="text-base font-medium text-neutral-700 dark:text-neutral-300 mb-2">
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
							<div className="mt-4 flex flex-col sm:flex-row gap-4 sm:gap-6">
								{experience.website &&
									experience.website.length &&
									experience.website.map((website) => (
										<Button
											key={website.url}
											asChild
											size="sm"
											variant="outline"
										>
											<a
												href={website.url}
												target="_blank"
												rel="noopener noreferrer"
											>
												{website.title} →
											</a>
										</Button>
									))}
							</div>
						</div>
					))}
				</div>
			</section>
		</Layout>
	);
}
