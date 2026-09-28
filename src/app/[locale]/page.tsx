import { Layout } from "@/components/layout/layout";
import { BlogPosts } from "@/components/posts";
import { Button } from "@/components/ui/button";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { localeAlternates, localizedPath, openGraphBase } from "@/lib/site";

type Props = {
	params: Promise<{ locale: string }>;
};

// Title and description come from the locale layout; the canonical lives here so that
// not-found pages do not inherit the homepage URL
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "meta" });

	return {
		alternates: localeAlternates(locale, "/"),
		openGraph: {
			...openGraphBase(locale),
			type: "website",
			title: t("siteTitle"),
			description: t("siteDescription"),
			url: localizedPath(locale, "/"),
		},
	};
}

export default async function Home({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations("home");

	return (
		<Layout>
			<section className="space-y-4 mb-16">
				<div className="space-y-1">
					<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
						{t("title")}
					</h1>
					<p className="text-xl text-muted-foreground">{t("subtitle")}</p>
				</div>
				<p className="mb-0">{t("intro")}</p>
				<p>{t("cta")}</p>

				<div className="flex flex-wrap gap-4">
					<Button asChild size="lg" className="px-8 text-base">
						<Link href="/experience">{t("viewWork")}</Link>
					</Button>
					<Button asChild size="lg" variant="secondary" className="text-base">
						<Link href="/contact">{t("getInTouch")}</Link>
					</Button>
				</div>
			</section>

			<section className="space-y-4">
				<h2 className="text-xl tracking-tighter">{t("recentPosts")}</h2>
				<BlogPosts limit={5} />
			</section>
		</Layout>
	);
}
