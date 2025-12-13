import { Layout } from "@/components/layout/layout";
import { getTranslations } from "next-intl/server";

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

export default async function AboutPage() {
	const t = await getTranslations("about");

	return (
		<Layout activePath="about">
			<section className="prose prose-neutral dark:prose-invert">
				<h1 className="font-semibold! text-3xl! md:text-4xl! mb-6! md:mb-8! mt-0! tracking-tighter">
					{t("pageTitle")}
				</h1>
				<p className="mb-1!">
					{t("intro1")}{" "}
					<strong className="font-semibold! border-b border-foreground/50">
						{t("intro1Bold")}
					</strong>
				</p>
				<p className="mt-0!">
					{t("intro2Part1")}{" "}
					<strong className="font-semibold!">{t("intro2MoveFast")}</strong>{" "}
					{t("intro2And")}{" "}
					<strong className="font-semibold!">{t("intro2Scale")}</strong>.
				</p>
				<p>{t("expertise")}</p>
				<ul className="space-y-1">
					<li>
						<strong className="font-semibold!">{t("expertiseAI")}</strong>{" "}
						{t("expertiseAIDesc")}
					</li>
					<li>
						<strong className="font-semibold!">
							{t("expertiseEcommerce")}
						</strong>{" "}
						{t("expertiseEcommerceDesc")}
					</li>
					<li>
						<strong className="font-semibold!">{t("expertiseSEO")}</strong>{" "}
						{t("expertiseSEODesc")}
					</li>
				</ul>
				<p>{t("leadershipIntro")}</p>
			</section>
			<hr className="my-6 border-neutral-200 dark:border-neutral-800" />
			<section className="prose prose-neutral dark:prose-invert">
				<h2 className="text-2xl! mb-4 sm:mb-6 tracking-tighter">
					{t("philosophyTitle")}
				</h2>
				<p>{t("philosophyIntro")}</p>
				<p>
					<strong className="font-semibold!">{t("philosophyNeither")}</strong>
				</p>
				<p className="mb-2!">
					{t("philosophyQuestion")} &quot;
					<strong className="font-semibold! border-b border-foreground/50">
						{t("philosophyQuestionBold")}
					</strong>
					&quot;
				</p>
				<ul className="space-y-1">
					<li>{t("philosophyMVP")}</li>
					<li>{t("philosophyFast")}</li>
					<li>{t("philosophyRobust")}</li>
				</ul>
				<p className="font-semibold border-l-4 border-foreground pl-2 py-1 bg-muted/50">
					{t("philosophyConclusion")}
				</p>
				<h2 className="text-2xl! mb-4 sm:mb-6 tracking-tighter">
					{t("beyondCodeTitle")}
				</h2>
				<p>{t("beyondCode1")}</p>
				<p>{t("beyondCode2")}</p>
			</section>
			<hr className="my-6 border-neutral-200 dark:border-neutral-800" />
			<section className="prose prose-neutral dark:prose-invert">
				<div>
					<h2 className="text-2xl! mb-4 sm:mb-6 tracking-tighter">
						{t("skillsTitle")}
					</h2>
					<div className="space-y-6">
						<div>
							<h3 className="font-medium text-base! mb-3 text-neutral-700 dark:text-neutral-300">
								{t("skillsFrontend")}
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
								{t("skillsBackend")}
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
								{t("skillsTools")}
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
