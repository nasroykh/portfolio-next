import fs from "fs";
import path from "path";
import matter from "gray-matter";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

type Metadata = {
	title: string;
	publishedAt: string;
	summary: string;
	image?: string;
};

function getMDXFiles(dir: string) {
	return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
	const rawContent = fs.readFileSync(filePath, "utf-8");
	const { data, content } = matter(rawContent);
	return { metadata: data as Metadata, content };
}

function getMDXData(dir: string) {
	const mdxFiles = getMDXFiles(dir);
	return mdxFiles
		.filter((file) => !file.includes("_draft_"))
		.map((file) => {
			const { metadata, content } = readMDXFile(path.join(dir, file));
			const slug = path.basename(file, path.extname(file));
			return {
				metadata,
				slug,
				content,
			};
		});
}

export function getBlogPosts() {
	return getMDXData(path.join(process.cwd(), "src", "app", "blog", "posts"));
}

dayjs.extend(relativeTime);

export function formatDate(date: string, includeRelative = false) {
	const targetDate = dayjs(date);
	const fullDate = targetDate.format("MMM D, YYYY");

	if (!includeRelative) {
		return fullDate;
	}

	return `${fullDate} (${targetDate.fromNow()})`;
}
