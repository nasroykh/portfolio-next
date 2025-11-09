import { Layout } from "@/components/layout/layout";

export const metadata = {
	title: "About",
	description:
		"AI/LLM Specialist and Software Engineer specializing in RAG systems, eCommerce platforms, and SEO optimization.",
};

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
		"tRPC",
		"Go",
		"gRPC",
		"Python",
		"Drizzle ORM",
		"Prisma",
		"PostgreSQL",
		"Redis",
		"Qdrant",
		"MongoDB",
		"BullMQ",
	],
	toolsAndTechnologies: [
		"OpenRouter",
		"OpenAI",
		"Google Gemini",
		"Anthropic",
		"LangChain",
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
		"Google Analytics",
	],
};

export default function AboutPage() {
	return (
		<Layout activePath="about">
			<section className="prose prose-neutral dark:prose-invert">
				<h1 className="font-semibold! text-3xl! md:text-4xl! mb-6! md:mb-8! mt-0! tracking-tighter">
					About Me
				</h1>
				<p className="mb-1!">
					I&apos;m Nas, a software engineer focused on one thing :{" "}
					<strong className="font-semibold! border-b border-foreground/50">
						helping businesses increase revenue.
					</strong>
				</p>
				<p className="mt-0!">
					I know when to <strong className="font-semibold!">move fast</strong>{" "}
					and when to{" "}
					<strong className="font-semibold!">build for scale</strong>.
				</p>
				<p>My expertise spans three core areas:</p>
				<ul className="space-y-1">
					<li>
						<strong className="font-semibold!">AI/LLM Integration</strong>{" "}
						(Building RAG systems, custom AI assistants, and AI-powered tools)
					</li>
					<li>
						<strong className="font-semibold!">eCommerce Development</strong>{" "}
						(Architecting scalable platforms with full payment integration,
						admin dashboards, and custom features)
					</li>
					<li>
						<strong className="font-semibold!">SEO Optimization</strong>{" "}
						(Driving measurable organic traffic growth through technical and
						content strategies)
					</li>
				</ul>
				<p>
					I&apos;ve led development teams, managed full-stack projects, and
					consistently delivered solutions that directly impact revenue and user
					engagement.
				</p>
			</section>
			<hr className="my-6 border-neutral-200 dark:border-neutral-800" />
			<section className="prose prose-neutral dark:prose-invert">
				<h2 className="text-2xl! mb-4 sm:mb-6 tracking-tighter">
					Philosophy & Approach
				</h2>
				<p>
					Most developers either over-engineer everything or hack things
					together.
				</p>
				<p>
					I do <strong className="font-semibold!"> neither</strong>.
				</p>
				<p className="mb-2!">
					I ask one question first: &quot;
					<strong className="font-semibold! border-b border-foreground/50">
						what does the business need right now?
					</strong>
					&quot;
				</p>
				<ul className="space-y-1">
					<li>Sometimes that&apos;s a quick MVP to test the market.</li>
					<li>
						Sometimes it&apos;s building fast but with clean architecture that
						scales when you need it.
					</li>
					<li>
						Sometimes it&apos;s taking the time to build a robust foundation
						that won&apos;t break at scale.{" "}
					</li>
				</ul>
				<p className="font-semibold border-l-4 border-foreground pl-2 py-1 bg-muted/50">
					The right choice depends on your timeline, budget, and growth
					trajectory—not on what&apos;s trendy.
				</p>
				<h2 className="text-2xl! mb-4 sm:mb-6 tracking-tighter">Beyond Code</h2>
				<p>
					I spend a lot of time experimenting with AI tools before they hit
					mainstream—not because I chase trends, but because I want to know
					what&apos;s actually useful versus what&apos;s just hype.
				</p>
				<p>
					I&apos;m particularly interested in how AI can automate the boring
					parts of business so humans can focus on what matters.
				</p>
			</section>
			<hr className="my-6 border-neutral-200 dark:border-neutral-800" />
			<section className="prose prose-neutral dark:prose-invert">
				<div>
					<h2 className="text-2xl! mb-4 sm:mb-6 tracking-tighter">
						Technical Skills
					</h2>
					<div className="space-y-6">
						<div>
							<h3 className="font-medium text-base! mb-3 text-neutral-700 dark:text-neutral-300">
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
							<h3 className="font-medium text-base! mb-3 text-neutral-700 dark:text-neutral-300">
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
							<h3 className="font-medium text-base! mb-3 text-neutral-700 dark:text-neutral-300">
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
