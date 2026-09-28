import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { BlogPosting, WithContext } from "schema-dts";
import { CustomMDX } from "@/components/mdx";
import JsonLd from "@/components/json-ld";
import {
	formatDate,
	getBlogPost,
	getBlogPosts,
	getExistingImage,
	parsePublishedAt,
} from "@/lib/blog";
import { Layout } from "@/components/layout/layout";
import {
	AUTHOR_NAME,
	SITE_URL,
	absoluteUrl,
	localeAlternates,
	ogImageUrl,
	openGraphBase,
} from "@/lib/site";

type Props = {
	params: Promise<{ locale: string; slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
	return getBlogPosts().map((post) => ({ slug: post.slug }));
}

const getCoverImage = (title: string, image?: string) => {
	const existing = getExistingImage(image);
	return existing ? absoluteUrl(existing) : ogImageUrl(title);
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale, slug } = await params;
	const post = getBlogPost(slug);
	if (!post) return {};

	const { title, publishedAt, summary: description, image, tags } =
		post.metadata;
	const ogImage = getCoverImage(title, image);
	const path = `/blog/${post.slug}`;

	return {
		title,
		description,
		keywords: tags,
		// Posts are written in English only: every locale points at the English URL
		alternates: localeAlternates(locale, path, false),
		openGraph: {
			...openGraphBase("en"),
			title,
			description,
			type: "article",
			publishedTime: parsePublishedAt(publishedAt).toISOString(),
			authors: [AUTHOR_NAME],
			url: path,
			images: [{ url: ogImage }],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [ogImage],
		},
	};
}

export default async function Blog({ params }: Props) {
	const { locale, slug } = await params;
	setRequestLocale(locale);
	const post = getBlogPost(slug);

	if (!post) notFound();

	const publishedIso = parsePublishedAt(post.metadata.publishedAt).toISOString();

	const jsonLd: WithContext<BlogPosting> = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.metadata.title,
		datePublished: publishedIso,
		dateModified: publishedIso,
		description: post.metadata.summary,
		image: getCoverImage(post.metadata.title, post.metadata.image),
		url: absoluteUrl(`/blog/${post.slug}`),
		inLanguage: "en",
		author: {
			"@type": "Person",
			name: AUTHOR_NAME,
			url: SITE_URL,
		},
	};

	return (
		<Layout>
			<section>
				<JsonLd content={jsonLd} />
				<h1 dir="auto" className="title font-semibold text-2xl tracking-tighter">
					{post.metadata.title}
				</h1>
				<div className="flex justify-between items-center mt-2 mb-8 text-sm">
					<time
						dateTime={publishedIso}
						className="text-sm text-neutral-800 dark:text-neutral-400"
					>
						{formatDate(post.metadata.publishedAt, locale)}
					</time>
				</div>
				{/* Posts are written in English: keep them left-to-right inside Arabic pages */}
				<article className="prose" lang="en" dir="ltr">
					<CustomMDX source={post.content} />
				</article>
			</section>
		</Layout>
	);
}
