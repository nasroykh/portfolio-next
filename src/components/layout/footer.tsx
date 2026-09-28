import {
	IconBrandGithub,
	IconBrandInstagram,
	IconBrandLinkedin,
	IconBrandMedium,
	IconBrandX,
} from "@tabler/icons-react";
import { getTranslations } from "next-intl/server";
import { TooltipWrapper } from "../ui/tooltip-wrapper";
import { SOCIAL_LINKS } from "@/lib/site";

const ICONS = {
	GitHub: IconBrandGithub,
	LinkedIn: IconBrandLinkedin,
	Medium: IconBrandMedium,
	Instagram: IconBrandInstagram,
	"X (Twitter)": IconBrandX,
} as const;

export const Footer = async () => {
	const t = await getTranslations();

	return (
		<footer className="mt-auto pt-2 pb-10 flex flex-col space-y-6 md:flex-row md:space-y-0 items-center justify-between">
			<ul
				aria-label={t("common.socialLinks")}
				className="flex items-center justify-center md:justify-start space-x-4 text-neutral-600 dark:text-neutral-300"
			>
				{SOCIAL_LINKS.map(({ name, url }) => {
					const Icon = ICONS[name];
					return (
						<li key={name}>
							<TooltipWrapper content={name}>
								<a
									className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
									rel="noopener noreferrer"
									target="_blank"
									href={url}
									aria-label={name}
								>
									<Icon size={24} aria-hidden />
								</a>
							</TooltipWrapper>
						</li>
					);
				})}
			</ul>
			<p className="text-center md:text-left text-neutral-600 dark:text-neutral-300">
				{t("footer.copyright", { year: new Date().getFullYear() })}
			</p>
		</footer>
	);
};
