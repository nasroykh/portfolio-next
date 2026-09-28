"use client";

import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { IconMenu2 } from "@tabler/icons-react";
import { SettingsDropdown } from "../settings-dropdown";
import { Logo } from "../logo";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { getDirection } from "@/i18n/config";

export const NAV_ITEMS = [
	{ name: "home", path: "/" },
	{ name: "about", path: "/about" },
	{ name: "experience", path: "/experience" },
	{ name: "projects", path: "/projects" },
	{ name: "blog", path: "/blog" },
	{ name: "contact", path: "/contact" },
	{ name: "resume", path: "/resume" },
] as const;

const isActivePath = (pathname: string, path: string) =>
	path === "/" ? pathname === "/" : pathname.startsWith(path);

export function Header() {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();
	const t = useTranslations("nav");
	const tCommon = useTranslations("common");
	const isRtl = getDirection(useLocale()) === "rtl";

	return (
		<header className="py-4 sticky top-0 bg-background z-50">
			<nav className="flex flex-row items-center justify-between" id="nav">
				<Link
					href="/"
					className="size-10 sm:size-12 flex items-center justify-center shrink-0"
					aria-label={tCommon("home")}
				>
					<Logo />
				</Link>

				<div className="hidden md:flex flex-row tracking-tight">
					{NAV_ITEMS.map(({ name, path }) => {
						const isActive = isActivePath(pathname, path);
						return (
							<Link
								key={path}
								href={path}
								aria-current={isActive ? "page" : undefined}
								className={cn(
									"transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1",
									isActive
										? "text-neutral-800 dark:text-neutral-200 underline underline-offset-8 decoration-1"
										: "text-neutral-500 dark:text-neutral-400",
								)}
							>
								{t(name)}
							</Link>
						);
					})}
				</div>

				<div className="flex items-center gap-2 shrink-0">
					<SettingsDropdown />

					<div className="flex md:hidden items-center gap-0">
						<Sheet open={open} onOpenChange={setOpen}>
							<SheetTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="size-9"
									aria-label={tCommon("openMenu")}
								>
									<IconMenu2 className="size-6" />
								</Button>
							</SheetTrigger>
							<SheetContent
								side={isRtl ? "left" : "right"}
								className="w-[280px] sm:w-[320px] px-4 py-16"
								aria-describedby={undefined}
							>
								<SheetTitle className="sr-only">{tCommon("openMenu")}</SheetTitle>
								<div className="flex flex-col gap-4">
									{NAV_ITEMS.map(({ name, path }) => {
										const isActive = isActivePath(pathname, path);
										return (
											<Link
												key={path}
												href={path}
												aria-current={isActive ? "page" : undefined}
												onClick={() => setOpen(false)}
												className={cn(
													"text-lg py-2 px-4 rounded-md transition-all",
													isActive
														? "text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800"
														: "text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900",
												)}
											>
												{t(name)}
											</Link>
										);
									})}
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</nav>
		</header>
	);
}
