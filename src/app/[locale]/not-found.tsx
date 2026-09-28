import { getTranslations } from "next-intl/server";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
	const t = await getTranslations("notFound");

	return (
		<Layout>
			<title>{`${t("title")} | Nas`}</title>
			<section className="space-y-4">
				<p className="text-sm text-muted-foreground">404</p>
				<h1 className="font-semibold text-3xl md:text-4xl tracking-tighter">
					{t("title")}
				</h1>
				<p>{t("description")}</p>
				<Button asChild size="lg">
					<Link href="/">{t("backHome")}</Link>
				</Button>
			</section>
		</Layout>
	);
}
