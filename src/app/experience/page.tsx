import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export const metadata = {
	title: "Experience",
	description:
		"Professional experience in AI/LLM development, eCommerce platforms, SEO optimization, and full-stack engineering.",
};

const experiences = [
	{
		id: "kb-developpement",
		companyName: "KB Développement",
		translationKey: "kbDeveloppement",
		website: [
			{
				titleKey: "visitWebsite",
				url: "https://www.kbdev.co/",
			},
			{
				titleKey: "visitLinkedIn",
				url: "https://www.linkedin.com/company/kb-développement/",
			},
		],
	},
	{
		id: "vexlogic",
		companyName: "VexLogic Ltd",
		translationKey: "vexlogic",
		website: [
			{
				titleKey: "visitWebsite",
				url: "https://vexlogic.com",
			},
		],
	},
	{
		id: "tech4fab",
		companyName: "Tech4Fab",
		translationKey: "tech4fab",
		website: [
			{
				titleKey: "visitWebsite",
				url: "https://tech4fab.com",
			},
			{
				titleKey: "visitLinkedIn",
				url: "https://www.linkedin.com/company/tech4fab/",
			},
		],
	},
	{
		id: "techivation",
		companyName: "Techivation Ltd",
		translationKey: "techivation",
		website: [
			{
				titleKey: "visitWebsite",
				url: "https://techivation.com",
			},
		],
	},
	{
		id: "solidersound",
		companyName: "SoliderSound Ltd",
		translationKey: "solidersound",
		website: [
			{
				titleKey: "visitWebsite",
				url: "https://solidersound.com",
			},
		],
	},
	{
		id: "brenco",
		companyName: "BRENCO Engineering & Consulting",
		translationKey: "brenco",
		website: [
			{
				titleKey: "visitWebsite",
				url: "https://brenco-algerie.com/",
			},
			{
				titleKey: "visitLinkedIn",
				url: "https://www.linkedin.com/company/brenco-engineering-&-consulting-services/",
			},
		],
	},
	{
		id: "freelancing",
		companyName: "Freelancing / Personal Projects",
		translationKey: "freelancing",
		website: [
			{
				titleKey: "visitFirstPortfolio",
				url: "https://first.nascodes.dev",
			},
			{
				titleKey: "visitPreviousPortfolio",
				url: "https://previous.nascodes.dev",
			},
		],
	},
] as const;

export default async function ExperiencePage() {
	const t = await getTranslations("experience");
	const tCommon = await getTranslations("common");

	return (
		<Layout activePath="experience">
			<section>
				<h1 className="font-semibold text-3xl md:text-4xl mb-8 tracking-tighter">
					{t("pageTitle")}
				</h1>

				<div className="">
					{experiences.map((experience) => {
						const role = t(`${experience.translationKey}.role`);
						const dateRange = t(`${experience.translationKey}.dateRange`);
						const description = t(`${experience.translationKey}.description`);
						const achievementsRaw = t.raw(
							`${experience.translationKey}.achievements`
						) as string[];

						return (
							<div
								key={experience.id}
								className="flex flex-col border-b last:border-b-0 first:pt-0 last:pb-6 border-neutral-200 dark:border-neutral-800 py-12 sm:py-14"
							>
								<div className="space-y-2 sm:space-y-0 mb-4">
									<div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-baseline gap-0 sm:gap-2">
										<h2 className="text-2xl tracking-tight">{role}</h2>
										<p className="text-sm text-neutral-600 dark:text-neutral-400">
											{dateRange}
										</p>
									</div>
									<p className="text-foreground/70 font-medium">
										{experience.companyName}
									</p>
								</div>
								<p className="text-neutral-600 dark:text-neutral-400 mb-3">
									{description}
								</p>
								<div className="mt-2">
									<p className="text-base font-medium text-neutral-700 dark:text-neutral-300 mb-2">
										{t("keyAchievements")}
									</p>
									<ul className="list-disc list-outside ml-4 sm:ml-5 space-y-1.5 text-sm text-neutral-600 dark:text-neutral-400">
										{achievementsRaw.map((achievement, idx) => (
											<li key={idx} className="pl-1">
												{achievement}
											</li>
										))}
									</ul>
								</div>
								<div className="mt-4 flex flex-col sm:flex-row gap-4 sm:gap-6">
									{experience.website &&
										experience.website.length > 0 &&
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
													{tCommon(website.titleKey)} →
												</a>
											</Button>
										))}
								</div>
							</div>
						);
					})}
				</div>
			</section>
		</Layout>
	);
}
