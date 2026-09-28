"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useLocale, useTranslations } from "next-intl";
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
import {
	LOCALE_COOKIE,
	LOCALE_NAMES,
	locales,
	type Locale,
} from "@/i18n/config";
import { getPathname, usePathname } from "@/i18n/navigation";

const THEMES = [
	{ value: "system", labelKey: "themeSystem", Icon: IconDeviceDesktop },
	{ value: "light", labelKey: "themeLight", Icon: IconSun },
	{ value: "dark", labelKey: "themeDark", Icon: IconMoon },
] as const;

const setLocaleCookie = (locale: Locale) => {
	document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
};

const noopSubscribe = () => () => {};

export function SettingsDropdown() {
	const { theme, setTheme } = useTheme();
	const t = useTranslations("settings");
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const [isPending, startTransition] = React.useTransition();
	// The active theme is only known on the client; avoid a hydration mismatch on the check marks
	const mounted = React.useSyncExternalStore(
		noopSubscribe,
		() => true,
		() => false,
	);

	const handleLocaleChange = (next: Locale) => {
		if (next === locale) return;
		// Store the choice first so the proxy does not redirect back to the old locale. next-intl's
		// router always prefixes on a locale change ("/en/about"), which stays in the address bar.
		setLocaleCookie(next);
		startTransition(() =>
			router.replace(getPathname({ href: pathname, locale: next })),
		);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="size-9"
					aria-label={t("title")}
					disabled={isPending}
				>
					<IconSettings className="size-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-48">
				<DropdownMenuLabel className="flex items-center gap-2">
					<IconSun className="size-4" />
					{t("theme")}
				</DropdownMenuLabel>
				<DropdownMenuGroup>
					{THEMES.map(({ value, labelKey, Icon }) => (
						<DropdownMenuItem key={value} onClick={() => setTheme(value)}>
							<Icon className="size-4" />
							{t(labelKey)}
							{mounted && theme === value && (
								<IconCheck className="size-4 ms-auto" />
							)}
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuLabel className="flex items-center gap-2">
					<IconLanguage className="size-4" />
					{t("language")}
				</DropdownMenuLabel>
				<DropdownMenuGroup>
					{locales.map((value) => (
						<DropdownMenuItem
							key={value}
							lang={value}
							onClick={() => handleLocaleChange(value)}
						>
							{LOCALE_NAMES[value]}
							{locale === value && <IconCheck className="size-4 ms-auto" />}
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
