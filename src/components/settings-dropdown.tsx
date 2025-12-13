"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import {
	IconSettings,
	IconSun,
	IconMoon,
	IconDeviceDesktop,
	IconLanguage,
	IconCheck,
} from "@tabler/icons-react";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function SettingsDropdown() {
	const { theme, setTheme } = useTheme();
	const t = useTranslations("settings");
	const [mounted, setMounted] = React.useState(false);
	const [currentLocale, setCurrentLocale] = React.useState("en");

	React.useEffect(() => {
		setMounted(true);
		// Get locale from cookie
		const locale = document.cookie
			.split("; ")
			.find((row) => row.startsWith("locale="))
			?.split("=")[1];
		if (locale) {
			setCurrentLocale(locale);
		}
	}, []);

	const handleLocaleChange = (locale: string) => {
		document.cookie = `locale=${locale};path=/;max-age=31536000`;
		setCurrentLocale(locale);
		window.location.reload();
	};

	if (!mounted) {
		return (
			<Button
				variant="ghost"
				size="icon"
				className="size-9"
				aria-label="Settings"
			>
				<IconSettings className="size-5 opacity-0" />
			</Button>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="size-9"
					aria-label="Settings"
				>
					<IconSettings className="size-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-48">
				{/* Theme Section */}
				<DropdownMenuLabel className="flex items-center gap-2">
					<IconSun className="size-4" />
					{t("theme")}
				</DropdownMenuLabel>
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={() => setTheme("system")}>
						<IconDeviceDesktop className="size-4" />
						{t("themeSystem")}
						{theme === "system" && <IconCheck className="size-4 ml-auto" />}
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme("light")}>
						<IconSun className="size-4" />
						{t("themeLight")}
						{theme === "light" && <IconCheck className="size-4 ml-auto" />}
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme("dark")}>
						<IconMoon className="size-4" />
						{t("themeDark")}
						{theme === "dark" && <IconCheck className="size-4 ml-auto" />}
					</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				{/* Language Section */}
				<DropdownMenuLabel className="flex items-center gap-2">
					<IconLanguage className="size-4" />
					{t("language")}
				</DropdownMenuLabel>
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={() => handleLocaleChange("en")}>
						🇺🇸 {t("languageEnglish")}
						{currentLocale === "en" && <IconCheck className="size-4 ml-auto" />}
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => handleLocaleChange("fr")}>
						🇫🇷 {t("languageFrench")}
						{currentLocale === "fr" && <IconCheck className="size-4 ml-auto" />}
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
