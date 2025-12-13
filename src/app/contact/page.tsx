import { EmailButton } from "@/components/email-button";
import { Layout } from "@/components/layout/layout";
import { getTranslations } from "next-intl/server";

export const metadata = {
	title: "Contact",
	description:
		"Get in touch with Nas for AI/LLM projects, eCommerce development, or SEO consulting.",
};

export default async function ContactPage() {
	const t = await getTranslations("contact");

	return (
		<Layout activePath="contact">
			<section>
				<h1 className="font-semibold text-3xl md:text-4xl mb-8 tracking-tighter">
					{t("pageTitle")}
				</h1>
				<div className="prose prose-neutral dark:prose-invert">
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
