import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { formatDate, getBlogPosts } from "@/lib/blog";

export async function BlogPosts({ limit }: { limit?: number }) {
	const locale = await getLocale();
	const posts = getBlogPosts().slice(0, limit);

	return (
		<ul>
			{posts.map((post) => (
				<li
					key={post.slug}
					className="border-b last:border-b-0 border-neutral-200 dark:border-neutral-800"
				>
					<Link className="group flex py-2" href={`/blog/${post.slug}`}>
						<div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4">
							<time
								dateTime={post.metadata.publishedAt.replace(" ", "T")}
								className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base tabular-nums shrink-0"
							>
								{formatDate(post.metadata.publishedAt, locale)}
							</time>
							<p
								dir="auto"
								className="text-neutral-900 dark:text-neutral-100 tracking-tight flex-1 group-hover:underline rtl:text-right"
							>
								{post.metadata.title}
							</p>
						</div>
					</Link>
				</li>
			))}
		</ul>
	);
}
