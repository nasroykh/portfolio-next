import { Layout } from "@/components/layout/layout";

export const metadata = {
	title: "About",
	description:
		"AI/LLM Specialist and Software Engineer specializing in RAG systems, eCommerce platforms, and SEO optimization.",
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
						I&apos;m Nas, a software engineer focused on one thing: helping
						businesses increase revenue. I know when to move fast and when to
						build for scale.
					</p>
					<p>My expertise spans three core areas:</p>
					<ul>
						<li>
							AI/LLM Integration (Building RAG systems, custom AI assistants,
							and AI-powered tools)
						</li>
						<li>
							eCommerce Development (Architecting scalable platforms with full
							payment integration, admin dashboards, and custom features)
						</li>
						<li>
							SEO Optimization (Driving measurable organic traffic growth
							through technical and content strategies)
						</li>
					</ul>
					<p>
						I&apos;ve led development teams, managed full-stack projects, and
						consistently delivered solutions that directly impact revenue and
						user engagement.
					</p>
					<hr className="my-6 border-neutral-100 dark:border-neutral-800" />
					<h2 className="font-medium text-xl mb-1 tracking-tighter mt-8">
						Philosophy & Approach
					</h2>
					<p>
						Most developers either over-engineer everything or hack things
						together.
					</p>
					<p>I do neither.</p>
					<p className="mb-2!">
						I ask one question first:{" "}
						<strong>&quot;what does the business need right now?&quot;</strong>
					</p>
					<ul className="">
						<li>Sometimes that&apos;s a quick MVP to test the market.</li>
						<li>
							Sometimes it&apos;s a robust foundation that won&apos;t break at
							scale.{" "}
						</li>
					</ul>
					<p>
						&#8594; The right choice depends on your timeline, budget, and
						growth trajectory—not on what&apos;s trendy.
					</p>
					<h2 className="font-medium text-xl mb-1 tracking-tighter mt-8">
						Beyond Code
					</h2>
					<p>
						I spend a lot of time experimenting with AI tools before they hit
						mainstream—not because I chase trends, but because I want to know
						what&apos;s actually useful versus what&apos;s just hype.
					</p>
					<p>
						I&apos;m particularly interested in how AI can automate the boring
						parts of business so humans can focus on what matters.
					</p>
				</div>
			</section>
		</Layout>
	);
}
