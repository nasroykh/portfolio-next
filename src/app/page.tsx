import { Layout } from "@/components/layout/layout";
import { BlogPosts } from "@/components/posts";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
	return (
		<Layout activePath="home">
			<section>
				<h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
					Hi, I&apos;m Nas
				</h1>
				<p className="text-lg text-muted-foreground mb-2">
					Transforming businesses with AI-powered solutions
				</p>
				<p className="mb-8">
					{`I'm an AI/LLM Specialist and Software Engineer specializing in RAG systems, eCommerce platforms, and SEO optimization. I build production-ready AI solutions and high-performance web applications that solve real business problems and drive measurable results.`}
				</p>

				<div className="flex flex-wrap gap-4">
					<Button asChild className="px-8 text-base">
						<Link href="/experience">View My Work</Link>
					</Button>
					<Button asChild variant="secondary" className="text-base">
						<Link href="/contact">Get In Touch</Link>
					</Button>
				</div>
				<div className="my-10">
					<h2 className="text-lg tracking-tighter mb-4">Recent Blog Posts</h2>
					<BlogPosts />
				</div>
			</section>
		</Layout>
	);
}
