"use client";

import {
	IconBrandGithub,
	IconBrandInstagram,
	IconBrandLinkedin,
	IconBrandMedium,
	IconBrandX,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { TooltipWrapper } from "../ui/tooltip-wrapper";

export const Footer = () => {
	const t = useTranslations("footer");

	return (
		<footer className="mt-auto pt-2 pb-10 flex flex-col space-y-6 md:flex-row md:space-y-0 items-center justify-between">
			<ul className="flex items-center justify-center md:justify-start space-x-4 text-neutral-600 dark:text-neutral-300">
				<li>
					<TooltipWrapper content="Github">
						<a
							className="flex items-center gap-1 transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
							rel="noopener noreferrer"
							target="_blank"
							href="https://github.com/nasroykh"
						>
							<IconBrandGithub size={24} />
						</a>
					</TooltipWrapper>
				</li>
				<li>
					<TooltipWrapper content="LinkedIn">
						<a
							className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
							rel="noopener noreferrer"
							target="_blank"
							href="https://www.linkedin.com/in/nas-y/"
						>
							<IconBrandLinkedin size={24} />
						</a>
					</TooltipWrapper>
				</li>
				<li>
					<TooltipWrapper content="Medium">
						<a
							className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
							rel="noopener noreferrer"
							target="_blank"
							href="https://medium.com/@nascodes"
						>
							<IconBrandMedium size={24} />
						</a>
					</TooltipWrapper>
				</li>
				<li>
					<TooltipWrapper content="Instagram">
						<a
							className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
							rel="noopener noreferrer"
							target="_blank"
							href="https://instagram.com/nascodes"
						>
							<IconBrandInstagram size={24} />
						</a>
					</TooltipWrapper>
				</li>
				<li>
					<TooltipWrapper content="X (Twitter)">
						<a
							className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
							rel="noopener noreferrer"
							target="_blank"
							href="https://x.com/nas_codes"
						>
							<IconBrandX size={24} />
						</a>
					</TooltipWrapper>
				</li>
			</ul>
			<p className="text-center md:text-left text-neutral-600 dark:text-neutral-300">
				{t("copyright", { year: new Date().getFullYear() })}
			</p>
		</footer>
	);
};
