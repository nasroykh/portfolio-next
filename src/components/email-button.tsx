"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { TooltipWrapper } from "./ui/tooltip-wrapper";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { CONTACT_EMAIL } from "@/lib/site";

// The address is only rendered after a click to keep it out of the server-rendered HTML
export const EmailButton = () => {
	const t = useTranslations("contact");
	const [isVisible, setIsVisible] = React.useState(false);
	const { copied, copy } = useCopyToClipboard();

	const handleCopyEmail = async () => {
		if (!(await copy(CONTACT_EMAIL))) {
			toast.error(t("copyFailed"));
		}
	};

	if (!isVisible) {
		return (
			<Button onClick={() => setIsVisible(true)} size="sm">
				{t("showEmail")}
			</Button>
		);
	}

	return (
		<div className="flex flex-col sm:flex-row gap-2">
			<TooltipWrapper content={t("copyEmail")}>
				<Button
					className="w-full sm:w-auto min-w-[200px] max-w-[300px]"
					size="sm"
					variant="outline"
					onClick={handleCopyEmail}
					aria-live="polite"
				>
					<span className="truncate">
						{copied ? t("emailCopied") : CONTACT_EMAIL}
					</span>
				</Button>
			</TooltipWrapper>
			<Button asChild size="sm" variant="ghost">
				<a href={`mailto:${CONTACT_EMAIL}`}>{t("sendEmail")}</a>
			</Button>
		</div>
	);
};
