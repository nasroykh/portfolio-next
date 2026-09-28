export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "locale";

export const isLocale = (value: unknown): value is Locale =>
	locales.includes(value as Locale);
