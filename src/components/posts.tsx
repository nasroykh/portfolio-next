import Link from "next/link";
import { formatDate, getBlogPosts } from "@/app/blog/utils";

export function BlogPosts() {
	const allBlogs = getBlogPosts();

	return (
		<ul className="">
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
					<li
						key={post.slug}
						className="border-b last:border-b-0 border-neutral-200 dark:border-neutral-800"
					>
						<Link className="group flex py-2" href={`/blog/${post.slug}`}>
							<div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4">
								<p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base tabular-nums">
									{formatDate(post.metadata.publishedAt, false)}
								</p>
								<p className="text-neutral-900 dark:text-neutral-100 tracking-tight flex-1 group-hover:underline">
									{post.metadata.title}
								</p>
							</div>
						</Link>
					</li>
				))}
		</ul>
	);
}
