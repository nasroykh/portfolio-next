import { Layout } from "@/components/layout/layout";

export const metadata = {
	title: "About",
	description: "AI/LLM Specialist and Software Engineer specializing in RAG systems, eCommerce platforms, and SEO optimization.",
};

export default function AboutPage() {
	return (
		<Layout activePath="about">
			<section>
				<h1 className="font-semibold text-xl sm:text-2xl md:text-3xl mb-6 md:mb-8 tracking-tighter">
					About Me
				</h1>
				<div className="prose prose-neutral dark:prose-invert">
					<p>
						Hey there! I&apos;m Nas, an AI/LLM Specialist and Software Engineer
						focused on building intelligent systems that solve real-world business
						challenges. Currently at VexLogic Ltd, I specialize in custom RAG
						(Retrieval-Augmented Generation) systems, AI assistants, and automated
						data solutions using OpenAI and other LLM APIs.
					</p>
					<p>
						My expertise spans three core areas: AI/LLM integration (building RAG
						systems and AI-powered tools), eCommerce development (architected
						platforms for Techivation and SoliderSound with full payment
						integration), and SEO optimization (driving measurable organic traffic
						growth through technical and content strategies). I combine deep
						technical skills with practical business understanding—whether
						it&apos;s implementing GPT-powered document analysis, building scalable
						eCommerce APIs, or optimizing sites for search engines. I&apos;ve led
						development teams, managed full-stack projects, and consistently
						delivered solutions that directly impact revenue and user engagement.
					</p>
					<hr className="my-6 border-neutral-100 dark:border-neutral-800" />
					<h2 className="font-medium text-xl mb-1 tracking-tighter">
						AI & LLM Expertise
					</h2>
					<p>
						Currently at VexLogic Ltd, I build custom RAG (Retrieval-Augmented
						Generation) systems that enable clients to query their own documents
						and data using natural language. I develop AI assistants using OpenAI
						and OpenRouter APIs, create automated web scraping tools with
						Puppeteer and Playwright, and build AI-powered solutions like
						personalized cold email systems that iteratively improve based on
						performance metrics. My work focuses on making LLMs practical and
						production-ready for real business applications.
					</p>
					<h2 className="font-medium text-xl mb-1 tracking-tighter mt-8">
						eCommerce & Full-Stack Development
					</h2>
					<p>
						I&apos;ve led the development of multiple eCommerce platforms from the
						ground up, including for Techivation Ltd and SoliderSound Ltd. This
						includes architecting scalable REST APIs, designing PostgreSQL
						databases, integrating Stripe and PayPal payment processing, building
						admin dashboards, and creating custom features like A/B audio players
						for product comparisons. My full-stack expertise spans Next.js and
						React on the frontend to Node.js, Go, Python, and various ORMs on the
						backend.
					</p>
					<h2 className="font-medium text-xl mb-1 tracking-tighter mt-8">
						SEO & Performance Optimization
					</h2>
					<p>
						I take a technical approach to SEO, combining code-level optimizations
						with strategic content improvements. My work has driven measurable
						increases in organic traffic through improved page load times,
						semantic HTML structure, schema markup, and content optimization. I
						understand that great SEO is about both technical excellence and user
						experience—from server-side rendering strategies to Core Web Vitals
						optimization.
					</p>
					<h2 className="font-medium text-xl mb-1 tracking-tighter mt-8">
						Philosophy & Approach
					</h2>
					<p>
						I believe in building systems that are maintainable, scalable, and
						actually solve business problems. Throughout my career, I&apos;ve led
						development teams, mentored junior developers, and consistently
						delivered solutions that directly impact revenue and user engagement.
						Whether it&apos;s implementing a custom RAG system, building an
						eCommerce platform that handles thousands of transactions, or
						optimizing a site to rank on page one—I focus on outcomes that matter.
					</p>
					<h2 className="font-medium text-xl mb-1 tracking-tighter mt-8">
						Beyond Code
					</h2>
					<p>
						When I&apos;m not coding, I&apos;m staying current with the rapidly
						evolving AI landscape, experimenting with new LLM techniques, and
						exploring how emerging technologies can be applied to real business
						challenges. I&apos;m particularly excited about the intersection of
						AI, automation, and data-driven decision making.
					</p>
				</div>
			</section>
		</Layout>
	);
}
