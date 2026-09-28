import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { EmailButton } from "@/components/email-button";
import { Layout } from "@/components/layout/layout";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = pageMetadata({
	title: "Contact",
	description:
		"Get in touch with Nas for AI/LLM projects, eCommerce development, or SEO consulting.",
	path: "/contact",
});

export default async function ContactPage() {
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
