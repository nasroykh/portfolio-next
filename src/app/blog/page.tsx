import { Layout } from "@/components/layout/layout";
import { BlogPosts } from "@/components/posts";

export const metadata = {
	title: "Blog",
	description:
		"Read my thoughts on AI/LLM development, RAG systems, eCommerce, SEO optimization, and software engineering.",
};

export default function BlogPage() {
	return (
		<Layout activePath="blog">
			<section>
				<h1 className="font-semibold text-3xl md:text-4xl mb-8 tracking-tighter">
					My Blog
				</h1>
				<BlogPosts />
			</section>
		</Layout>
	);
}
