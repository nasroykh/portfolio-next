import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { IconArrowLeft } from "@tabler/icons-react";
import { SettingsDropdown } from "@/components/settings-dropdown";
import { PrintButton } from "@/components/print-button";
import { Button } from "@/components/ui/button";
import { AUTHOR_NAME, SOCIAL_LINKS, pageMetadata } from "@/lib/site";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "meta" });

	return pageMetadata({
		title: t("resumeTitle"),
		description: t("resumeDescription"),
		path: "/resume",
		locale,
	});
}

type ResumeExperience = {
	translationKey: string;
	company: string;
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
	},
	{
		translationKey: "techivation",
		company: "Techivation Ltd · techivation.com",
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

export default async function ResumePage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations("resume");

	return (
		<main className="max-w-4xl mx-auto space-y-8 py-8 px-4 print:max-w-none print:p-0 print:space-y-0">
			<div className="flex justify-between items-center gap-4 print:hidden">
				<div className="flex items-center gap-2">
					<Button asChild size="icon">
						<Link href="/" aria-label={t("backHome")}>
							<IconArrowLeft className="size-4 rtl:-scale-x-100" aria-hidden />
						</Link>
					</Button>
					<PrintButton label={t("exportPDF")} />
				</div>
				<div className="hidden md:block">
					<SettingsDropdown />
				</div>
			</div>

			<div className="bg-card rounded-lg shadow-sm border p-8 md:p-12 print:p-0 print:rounded-none print:shadow-none print:border-0">
				<div className="mb-8 pb-6 border-b">
					<h1 className="text-4xl font-bold mb-2">{AUTHOR_NAME} (Nas)</h1>
					<p className="text-xl text-muted-foreground mb-4">{t("title")}</p>
					<div className="flex flex-wrap gap-4 text-sm">
						{SOCIAL_LINKS.map(({ name, url }) => (
							<a
								key={name}
								href={url}
								target="_blank"
								rel="noopener noreferrer"
								className="hover:underline"
							>
								{name}
							</a>
						))}
					</div>
				</div>

				<section className="mb-8">
					<h2 className="text-2xl font-bold mb-3 break-after-avoid">
						{t("professionalSummary")}
					</h2>
					<p className="text-muted-foreground leading-relaxed">
						{t("professionalSummaryText")}
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-bold mb-3 break-after-avoid">
						{t("technicalSkills")}
					</h2>
					<div className="grid md:grid-cols-2 print:grid-cols-2 gap-4 text-sm">
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

				<section className="mb-8">
					<h2 className="text-2xl font-bold mb-4 break-after-avoid">
						{t("workExperience")}
					</h2>

					<div className="space-y-6">
						{resumeExperiences.map((exp) => {
							const role = t(`${exp.translationKey}.role`);
							const dateRange = t(`${exp.translationKey}.dateRange`);
							const achievements = t.raw(
								`${exp.translationKey}.achievements`,
							) as string[];

							return (
								<div key={exp.translationKey} className="break-inside-avoid">
									<div className="flex justify-between items-start mb-2">
										<div>
											<h3 className="text-lg font-semibold">{role}</h3>
											<p className="text-muted-foreground">{exp.company}</p>
										</div>
										<span className="text-sm text-muted-foreground whitespace-nowrap">
											{dateRange}
										</span>
									</div>
									<ul className="text-sm text-muted-foreground space-y-1 ms-4 list-disc list-outside">
										{achievements.map((achievement, idx) => (
											<li key={idx}>{achievement}</li>
										))}
									</ul>
								</div>
							);
						})}
					</div>
				</section>
			</div>
		</main>
	);
}
