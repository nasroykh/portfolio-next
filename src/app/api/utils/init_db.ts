import { promises as fs } from "fs";
import path from "path";
import {
	createQdrantCollection,
	qdrant,
	addQdrantVectors,
	deleteQdrantCollection,
} from "./qdrant";
import { OPENROUTER_EMBEDDING_MODELS, OpenRouterEmbed } from "./openrouter";
import { randomUUID } from "crypto";

export const COLLECTION_NAME = "nas_portfolio";
export const EMBEDDING_MODEL =
	"openaiTextEmbedding3Small" as keyof typeof OPENROUTER_EMBEDDING_MODELS;
export const VECTOR_SIZE = 1536;

// Portfolio content to be indexed
const portfolioContent = {
	about: {
		id: randomUUID(),
		type: "page",
		title: "About Nas",
		content: `I'm Nas, a software engineer focused on helping businesses increase revenue. I know when to move fast and when to build for scale.

My expertise spans three core areas:
- AI/LLM Integration: Building RAG systems, custom AI assistants, and AI-powered tools
- eCommerce Development: Architecting scalable platforms with full payment integration, admin dashboards, and custom features  
- SEO Optimization: Driving measurable organic traffic growth through technical and content strategies

I've led development teams, managed full-stack projects, and consistently delivered solutions that directly impact revenue and user engagement.

Philosophy & Approach:
Most developers either over-engineer everything or hack things together. I do neither. I ask one question first: "what does the business need right now?"
- Sometimes that's a quick MVP to test the market
- Sometimes it's a robust foundation that won't break at scale

The right choice depends on your timeline, budget, and growth trajectory—not on what's trendy.

I spend time experimenting with AI tools before they hit mainstream—not because I chase trends, but because I want to know what's actually useful versus what's just hype. I'm particularly interested in how AI can automate the boring parts of business so humans can focus on what matters.`,
	},
	experience: [
		{
			id: randomUUID(),
			type: "experience",
			title: "VexLogic Ltd - AI/LLM Specialist & Lead Developer",
			dateRange: "April 2025 - Present",
			content: `Current Role at VexLogic Ltd as AI/LLM Specialist & Lead Developer (April 2025 - Present)

Specialize in building production-ready AI solutions with focus on RAG systems, custom AI assistants, and intelligent automation tools. Work directly with OpenAI, Anthropic, and other LLM APIs.

Key Achievements:
- Architected and deployed custom RAG (Retrieval-Augmented Generation) systems enabling natural language querying of proprietary documents and knowledge bases using vector embeddings and semantic search
- Built intelligent web scraping and data extraction pipelines with Puppeteer and Playwright, integrated with LLMs for automated content analysis and structured data extraction
- Developed AI assistants and chatbots using OpenRouter, OpenAI, and Anthropic APIs for customer support, internal tooling, and workflow automation
- Created an AI-powered cold email system with automated personalization, A/B testing, and iterative improvement based on engagement metrics—significantly increasing conversion rates
- Implemented prompt engineering strategies, few-shot learning patterns, and chain-of-thought reasoning for improved AI response quality and reliability

Website: https://vexlogic.com`,
		},
		{
			id: randomUUID(),
			type: "experience",
			title: "Techivation Ltd - IT Specialist & Lead Developer",
			dateRange: "September 2021 - December 2023",
			content: `Techivation Ltd - IT Specialist & Lead Developer (September 2021 - December 2023)

Led end-to-end development of high-performance eCommerce platform for UK-based audio software company. Architected scalable backend infrastructure, implemented payment processing, and drove significant SEO improvements.

Key Achievements:
- Architected and built RESTful API and PostgreSQL database from scratch, handling products, licensing, orders, and customer management with optimized query performance
- Implemented comprehensive SEO strategy combining technical optimizations (server-side rendering, semantic HTML, schema markup) and content improvements—driving 40%+ increase in organic traffic
- Integrated Stripe and PayPal payment gateways with subscription management, webhooks for automated license delivery, and fraud prevention measures
- Developed custom interactive A/B audio player allowing customers to compare processed vs unprocessed audio in real-time, significantly improving conversion rates
- Built comprehensive admin dashboards with analytics, inventory management, order processing, and customer support tools using React and TypeScript
- Optimized Core Web Vitals through lazy loading, image optimization, and strategic code splitting—improving page speed scores from 60s to 90+
- Led and mentored team of 3 junior developers, conducted code reviews, and established development best practices and CI/CD workflows

Website: https://techivation.com`,
		},
		{
			id: randomUUID(),
			type: "experience",
			title: "Tech4Fab - Full Stack Developer",
			dateRange: "June 2024 - April 2025",
			content: `Tech4Fab - Full Stack Developer (June 2024 - April 2025)

Developed and improved a widget builder platform that lets companies create custom dashboards to visualize their data. Worked on both the drag-and-drop interface and the backend systems.

Key Achievements:
- Built flexible widget builder with drag-and-drop functionality for creating custom dashboards
- Created real-time data visualization components that update dynamically as data changes
- Developed backend infrastructure to handle custom widget configurations and data processing`,
		},
	],
	skills: {
		id: randomUUID(),
		type: "skills",
		title: "Technical Skills",
		content: `Nas's Technical Skills and Expertise:

Frontend Technologies:
Next.js, React, Svelte, Tailwind CSS, Tanstack Query, Tanstack Router, SCSS, Shadcn UI, Jotai, Zustand, Vite

Backend Technologies:
Node.js, Fastify, TRPC, Go, Python, Drizzle ORM, Prisma, PostgreSQL, Redis, MongoDB, BullMQ

AI & Tools:
OpenAI, Google Gemini, OpenRouter, Puppeteer, Playwright, Docker, Linux, Stripe, Electron, Figma, Jest, NGINX, Caddy, PayPal, GraphQL, AWS

Core Competencies:
- Building production-ready RAG systems with vector embeddings
- Custom AI assistant development using OpenRouter, OpenAI, and Anthropic APIs
- eCommerce platform architecture and development
- Payment gateway integration (Stripe, PayPal)
- SEO optimization (technical and content strategies)
- Full-stack web development
- Database design and optimization
- API development and architecture`,
	},
};

export const initDB = async () => {
	try {
		console.log("🚀 Initializing Qdrant database...");

		// Create collection with appropriate vector dimensions
		await deleteQdrantCollection(qdrant, COLLECTION_NAME);
		await createQdrantCollection(qdrant, COLLECTION_NAME, VECTOR_SIZE);

		const points: {
			id: string;
			vector: number[];
			payload: { text: string; timestamp: string; type: string; title: string };
		}[] = [];

		// Process static content
		console.log("📝 Processing static content...");

		// About page
		const aboutEmbedding = await OpenRouterEmbed(
			EMBEDDING_MODEL,
			portfolioContent.about.content
		);
		points.push({
			id: randomUUID(),
			vector: aboutEmbedding,
			payload: {
				text: portfolioContent.about.content,
				timestamp: new Date().toISOString(),
				type: portfolioContent.about.type,
				title: portfolioContent.about.title,
			},
		});

		// Experience entries
		for (const exp of portfolioContent.experience) {
			const expEmbedding = await OpenRouterEmbed(EMBEDDING_MODEL, exp.content);
			points.push({
				id: randomUUID(),
				vector: expEmbedding,
				payload: {
					text: exp.content,
					timestamp: new Date().toISOString(),
					type: exp.type,
					title: exp.title,
				},
			});
		}

		// Skills
		const skillsEmbedding = await OpenRouterEmbed(
			EMBEDDING_MODEL,
			portfolioContent.skills.content
		);
		points.push({
			id: randomUUID(),
			vector: skillsEmbedding,
			payload: {
				text: portfolioContent.skills.content,
				timestamp: new Date().toISOString(),
				type: portfolioContent.skills.type,
				title: portfolioContent.skills.title,
			},
		});

		// Process blog posts
		// console.log("📚 Processing blog posts...");
		// const blogPostsDir = path.join(process.cwd(), "src/app/blog/posts");
		// const blogFiles = await fs.readdir(blogPostsDir);

		// for (const file of blogFiles) {
		// 	if (!file.endsWith(".mdx")) continue;

		// 	const filePath = path.join(blogPostsDir, file);
		// 	const content = await fs.readFile(filePath, "utf-8");

		// 	// Extract frontmatter and content
		// 	const frontmatterMatch = content.match(
		// 		/^---\n([\s\S]*?)\n---\n([\s\S]*)$/
		// 	);
		// 	if (!frontmatterMatch) continue;

		// 	const [, frontmatter, mdxContent] = frontmatterMatch;
		// 	const titleMatch = frontmatter.match(/title:\s*"([^"]+)"/);
		// 	const summaryMatch = frontmatter.match(/summary:\s*"([^"]+)"/);

		// 	const title = titleMatch ? titleMatch[1] : file.replace(".mdx", "");
		// 	const summary = summaryMatch ? summaryMatch[1] : "";

		// 	// Chunk the blog post (split by sections for better granularity)
		// 	const sections = mdxContent.split(/\n#{1,2}\s+/);

		// 	for (let i = 0; i < sections.length; i++) {
		// 		const section = sections[i].trim();
		// 		if (section.length < 100) continue; // Skip very short sections

		// 		const chunkContent = `Blog Post: ${title}\n${
		// 			summary ? `Summary: ${summary}\n\n` : ""
		// 		}${section}`;

		// 		const blogEmbedding = await OpenRouterEmbed(
		// 			EMBEDDING_MODEL,
		// 			chunkContent
		// 		);

		// 		points.push({
		// 			id: randomUUID(),
		// 			vector: blogEmbedding,
		// 			payload: {
		// 				text: chunkContent,
		// 				timestamp: new Date().toISOString(),
		// 				type: "blog",
		// 				title: `${title} - Section ${i + 1}`,
		// 			},
		// 		});
		// 	}
		// }

		// Add all points to Qdrant
		console.log(`💾 Adding ${points.length} vectors to Qdrant...`);
		await addQdrantVectors(qdrant, COLLECTION_NAME, points);

		console.log("✅ Database initialization complete!");
		console.log(`📊 Total vectors indexed: ${points.length}`);
	} catch (error) {
		console.error("❌ Database initialization failed:", error);
		throw error;
	}
};
