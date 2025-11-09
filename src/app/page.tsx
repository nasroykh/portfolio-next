import { Layout } from "@/components/layout/layout";
import { BlogPosts } from "@/components/posts";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
	return (
		<Layout activePath="home">
			<section className="space-y-4 mb-16">
				<div className="space-y-1">
					<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
						Software Engineer - AI/LLM Specialist
					</h1>
					<p className="text-xl text-muted-foreground">
						Nasr Eddine Yakhou (Nas)
					</p>
				</div>
				<p className="mb-0">
					{`I build web applications that actually work—from AI-powered tools to eCommerce platforms.`}
				</p>
				<p>{`Let's solve your business problems together.`}</p>

				<div className="flex flex-wrap gap-4">
					<Button asChild size="lg" className="px-8 text-base">
						<Link href="/experience">View My Work</Link>
					</Button>
					<Button asChild size="lg" variant="secondary" className="text-base">
						<Link href="/contact">Get In Touch</Link>
					</Button>
				</div>
			</section>

			<section className="space-y-4">
				<h2 className="text-xl tracking-tighter">Recent Blog Posts</h2>
				<BlogPosts />
			</section>
		</Layout>
	);
}
