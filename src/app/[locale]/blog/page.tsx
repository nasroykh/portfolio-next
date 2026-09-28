import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { Layout } from "@/components/layout/layout";
import { BlogPosts } from "@/components/posts";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "meta" });

	return pageMetadata({
		title: t("blogTitle"),
		description: t("blogDescription"),
		path: "/blog",
		locale,
	});
}

export default async function BlogPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations("blog");

	return (
		<Layout>
			<section>
				<h1 className="font-semibold text-3xl md:text-4xl mb-8 tracking-tighter">
					{t("pageTitle")}
				</h1>
				<BlogPosts />
			</section>
		</Layout>
	);
}
