import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { defaultLocale, isLocale, LOCALE_COOKIE } from "./config";

export default getRequestConfig(async () => {
	const store = await cookies();
	const cookieLocale = store.get(LOCALE_COOKIE)?.value;
	// An unknown/stale cookie value must not crash every page with a failed import
	const locale = isLocale(cookieLocale) ? cookieLocale : defaultLocale;

	return {
		locale,
		messages: (await import(`../../messages/${locale}.json`)).default,
	};
});
