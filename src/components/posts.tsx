import Link from "next/link";
import { formatDate, getBlogPosts } from "@/app/blog/utils";

export function BlogPosts() {
	const allBlogs = getBlogPosts();

	return (
		<div className="space-y-3">
			{allBlogs
				.sort((a, b) => {
					if (
						new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
					) {
						return -1;
					}
					return 1;
				})
				.map((post) => (
					<Link
						key={post.slug}
						className="flex flex-col space-y-1 group"
						href={`/blog/${post.slug}`}
					>
						<div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-0">
							<p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base tabular-nums sm:max-w-28 sm:border-r-2 border-border sm:pr-2 sm:mr-2">
								{formatDate(post.metadata.publishedAt, false)}
							</p>
							<p className="text-neutral-900 dark:text-neutral-100 tracking-tight flex-1 group-hover:underline">
								{post.metadata.title}
							</p>
						</div>
					</Link>
				))}
		</div>
	);
}
