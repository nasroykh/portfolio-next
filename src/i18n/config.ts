export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "locale";

/** Native language names, shown as-is in the language switcher. */
export const LOCALE_NAMES: Record<Locale, string> = {
	en: "English",
	fr: "Français",
};

/** Open Graph locale codes. */
export const OG_LOCALES: Record<Locale, string> = {
	en: "en_US",
	fr: "fr_FR",
};

const RTL_LOCALES: readonly string[] = ["ar", "fa", "he", "ur"];

export const getDirection = (locale: string) =>
	RTL_LOCALES.includes(locale) ? "rtl" : "ltr";

export const isLocale = (value: unknown): value is Locale =>
	locales.includes(value as Locale);
