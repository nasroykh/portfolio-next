import { Layout } from "@/components/layout/layout";
import { BlogPosts } from "@/components/posts";
import { getTranslations } from "next-intl/server";

export const metadata = {
	title: "Blog",
	description:
		"Read my thoughts on AI/LLM development, RAG systems, eCommerce, SEO optimization, and software engineering.",
};

export default async function BlogPage() {
	const t = await getTranslations("blog");

	return (
		<Layout activePath="blog">
			<section>
				<h1 className="font-semibold text-3xl md:text-4xl mb-8 tracking-tighter">
					{t("pageTitle")}
				</h1>
				<BlogPosts />
			</section>
		</Layout>
	);
}
