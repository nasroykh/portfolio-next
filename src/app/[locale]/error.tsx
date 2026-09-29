"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

// Runtime errors in a page render here, inside the locale layout (header, footer, translations)
export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const t = useTranslations("error");

	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<Layout>
			<section className="space-y-4">
				<h1 className="font-semibold text-3xl md:text-4xl tracking-tighter">
					{t("title")}
				</h1>
				<p>{t("description")}</p>
				<div className="flex flex-wrap gap-4">
					<Button size="lg" onClick={reset}>
						{t("retry")}
					</Button>
					<Button asChild size="lg" variant="secondary">
						<Link href="/">{t("backHome")}</Link>
					</Button>
				</div>
			</section>
		</Layout>
	);
}
