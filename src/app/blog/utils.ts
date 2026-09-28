import fs from "fs";
import path from "path";
import { cache } from "react";
import matter from "gray-matter";

type Metadata = {
	title: string;
	publishedAt: string;
	summary: string;
	image?: string;
	tags?: string[];
};

export type BlogPost = {
	metadata: Metadata;
	slug: string;
	content: string;
};

const POSTS_DIR = path.join(process.cwd(), "src", "app", "blog", "posts");
const PUBLIC_DIR = path.join(process.cwd(), "public");

// Front matter uses "YYYY-MM-DD HH:mm" without an offset; treat it as UTC so dates do not
// shift with the server timezone
export const parsePublishedAt = (value: string) => {
	const iso = value.trim().replace(" ", "T");
	return new Date(/(Z|[+-]\d{2}:?\d{2})$/.test(iso) ? iso : `${iso}Z`);
};

function readPost(file: string): BlogPost {
	const rawContent = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
	const { data, content } = matter(rawContent);

	return {
		metadata: data as Metadata,
		slug: path.basename(file, path.extname(file)),
		content,
	};
}

/** Published posts (files prefixed with `_draft_` are excluded), newest first. */
export const getBlogPosts = cache((): BlogPost[] =>
	fs
		.readdirSync(POSTS_DIR)
		.filter((file) => path.extname(file) === ".mdx" && !file.startsWith("_draft_"))
		.map(readPost)
		.sort(
			(a, b) =>
				parsePublishedAt(b.metadata.publishedAt).getTime() -
				parsePublishedAt(a.metadata.publishedAt).getTime(),
		),
);

export const getBlogPost = (slug: string) =>
	getBlogPosts().find((post) => post.slug === slug);

/** Returns the cover image path only if the file actually ships in /public. */
export const getExistingImage = (image?: string) =>
	image?.startsWith("/") && fs.existsSync(path.join(PUBLIC_DIR, image))
		? image
		: undefined;

export function formatDate(date: string, locale: string) {
	return new Intl.DateTimeFormat(locale, {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "UTC",
	}).format(parsePublishedAt(date));
}
