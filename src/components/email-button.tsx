"use client";

import React from "react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export const EmailButton = () => {
	const [isVisible, setIsVisible] = React.useState(false);
	const [isCopied, setIsCopied] = React.useState(false);

	React.useEffect(() => {
		if (isCopied) {
			const timeout = setTimeout(() => {
				setIsCopied(false);
			}, 2000);
			return () => clearTimeout(timeout);
		}
	}, [isCopied]);

	const handleCopyEmail = () => {
		navigator.clipboard.writeText("nascodes@protonmail.com");
		setIsCopied(true);
	};

	return isVisible ? (
		<Tooltip delayDuration={0}>
			<TooltipTrigger asChild>
				<Button
					className="w-full sm:w-auto min-w-[200px] max-w-[300px]"
					size="sm"
					variant="outline"
					onClick={handleCopyEmail}
				>
					<span className="truncate">
						{isCopied ? "Email copied!" : "nascodes@protonmail.com"}
					</span>
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>Click to copy email</p>
			</TooltipContent>
		</Tooltip>
	) : (
		<Button onClick={() => setIsVisible(true)} size="sm">
			Click to view email
		</Button>
	);
};
