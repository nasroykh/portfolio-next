import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { EmailButton } from "@/components/email-button";
import { Layout } from "@/components/layout/layout";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "meta" });

	return pageMetadata({
		title: t("contactTitle"),
		description: t("contactDescription"),
		path: "/contact",
		locale,
	});
}

export default async function ContactPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations("contact");

	return (
		<Layout>
			<section>
				<h1 className="font-semibold text-3xl md:text-4xl mb-8 tracking-tighter">
					{t("pageTitle")}
				</h1>
				<div className="prose">
					<p>{t("intro")}</p>
					<div className="mt-8 space-y-4">
						<div>
							<EmailButton />
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
}
