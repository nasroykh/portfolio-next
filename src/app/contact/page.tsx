import { EmailButton } from "@/components/email-button";
import { Layout } from "@/components/layout/layout";

export const metadata = {
	title: "Contact",
	description:
		"Get in touch with Nas for AI/LLM projects, eCommerce development, or SEO consulting.",
};

export default function ContactPage() {
	return (
		<Layout activePath="contact">
			<section>
				<h1 className="font-semibold text-3xl md:text-4xl mb-8 tracking-tighter">
					Get in Touch
				</h1>
				<div className="prose prose-neutral dark:prose-invert">
					<p>
						I&apos;m always interested in hearing about new projects and
						opportunities, particularly those involving AI/LLM integration,
						eCommerce development, or SEO optimization. Whether you need help
						building a custom RAG system, architecting an eCommerce platform, or
						improving your site&apos;s search rankings—or just want to say
						hi—feel free to reach out!
					</p>
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
