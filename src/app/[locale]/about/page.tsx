import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { Layout } from "@/components/layout/layout";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "meta" });

	return pageMetadata({
		title: t("aboutTitle"),
		description: t("aboutDescription"),
		path: "/about",
		locale,
	});
}

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

export default async function AboutPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations("about");

	return (
		<Layout>
			<section className="prose">
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
			<section className="prose">
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
				<p className="font-semibold border-s-4 border-foreground ps-2 py-1 bg-muted/50">
					{t("philosophyConclusion")}
				</p>
				<h2 className="text-2xl! mb-4 sm:mb-6 tracking-tighter">
					{t("beyondCodeTitle")}
				</h2>
				<p>{t("beyondCode1")}</p>
				<p>{t("beyondCode2")}</p>
			</section>
			<hr className="my-6 border-neutral-200 dark:border-neutral-800" />
			<section className="prose">
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
