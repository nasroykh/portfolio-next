import { Layout } from "@/components/layout/layout";
import { BlogPosts } from "@/components/posts";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Home() {
	const t = await getTranslations("home");

	return (
		<Layout activePath="home">
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
				<BlogPosts />
			</section>
		</Layout>
	);
}
