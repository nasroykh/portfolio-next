import { expect, test } from "@playwright/test";

const SITE = "https://nascodes.dev";
const LOCALES = [
	{ locale: "en", prefix: "", dir: "ltr" },
	{ locale: "fr", prefix: "/fr", dir: "ltr" },
	{ locale: "ar", prefix: "/ar", dir: "rtl" },
	{ locale: "es", prefix: "/es", dir: "ltr" },
] as const;
const PAGES = ["/", "/about", "/experience", "/projects", "/blog", "/contact", "/resume"];

// Browsers otherwise get redirected by Accept-Language / the locale cookie
test.use({ locale: "en-US" });

test.describe("translated pages", () => {
	for (const { locale, prefix, dir } of LOCALES) {
		for (const page of PAGES) {
			const path = prefix + (page === "/" && prefix ? "" : page);

			test(`${path} renders in ${locale}`, async ({ page: browser }) => {
				const response = await browser.goto(path);
				expect(response?.status()).toBe(200);

				const html = browser.locator("html");
				await expect(html).toHaveAttribute("lang", locale);
				await expect(html).toHaveAttribute("dir", dir);
				await expect(browser.locator("h1").first()).toBeVisible();

				const canonical = `${SITE}${path === "/" ? "" : path}`;
				await expect(browser.locator('link[rel="canonical"]')).toHaveAttribute(
					"href",
					canonical,
				);
				await expect(browser.locator('link[rel="alternate"]')).toHaveCount(
					LOCALES.length + 1,
				);
			});
		}
	}
});

test("English-only content points its canonical at the English URL", async ({ page }) => {
	await page.goto("/ar/projects/foxmayn-ai");
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
		"href",
		`${SITE}/projects/foxmayn-ai`,
	);
	await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
});

test("/en/... redirects to the unprefixed URL", async ({ page }) => {
	await page.goto("/en/about");
	await expect(page).toHaveURL(/\/about$/);
	expect(new URL(page.url()).pathname).toBe("/about");
});

test("unknown paths render the localized 404", async ({ page }) => {
	const response = await page.goto("/fr/does-not-exist");
	expect(response?.status()).toBe(404);
	await expect(page.locator("h1")).toHaveText("Page introuvable");
	await expect(page.locator("#nav")).toBeVisible();
});

test("language switcher keeps the page and updates the URL", async ({ page }) => {
	await page.goto("/about");

	await page.getByRole("button", { name: "Settings" }).click();
	await page.getByRole("menuitem", { name: "Français" }).click();
	await expect(page).toHaveURL(/\/fr\/about$/);
	await expect(page.locator("html")).toHaveAttribute("lang", "fr");

	await page.getByRole("button", { name: "Paramètres" }).click();
	await page.getByRole("menuitem", { name: "English" }).click();
	await expect(page).toHaveURL(/\/about$/);
	expect(new URL(page.url()).pathname).toBe("/about");
	await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("Arabic layout is mirrored", async ({ page }) => {
	await page.setViewportSize({ width: 1280, height: 800 });
	await page.goto("/ar");

	const logo = await page.locator("#nav > a").first().boundingBox();
	const settings = await page.locator("#nav button[aria-haspopup=menu]").boundingBox();
	expect(logo && settings && logo.x > settings.x).toBe(true);
});

test("chat shows an error and restores the question when the API fails", async ({
	page,
}) => {
	// No real OpenRouter call: the API answers like an upstream outage
	await page.route("**/api", (route) =>
		route.fulfill({
			status: 502,
			contentType: "application/json",
			body: JSON.stringify({ success: false, message: "unavailable" }),
		}),
	);
	await page.goto("/");

	await page.locator('button[aria-controls="otacon-panel"]').click();
	const input = page.locator("#otacon-panel textarea");
	await input.fill("What does Nas do?");
	await input.press("Enter");

	await expect(page.locator("[data-sonner-toast]")).toBeVisible();
	await expect(input).toHaveValue("What does Nas do?");
	await expect(page.locator("#otacon-panel .chat-markdown")).toHaveCount(0);
});

test("sitemap lists every locale, post and case study", async ({ request }) => {
	const body = await (await request.get("/sitemap.xml")).text();
	const urls = body.match(/<loc>/g) ?? [];
	// 7 translated pages x 4 locales + posts + case studies
	expect(urls.length).toBeGreaterThanOrEqual(PAGES.length * LOCALES.length);
	expect(body).toContain(`<loc>${SITE}/ar/about</loc>`);
});

test("OG images only render known titles", async ({ request }) => {
	const known = await request.get("/og?title=Foxmayn%20AI");
	const unknown = await request.get("/og?title=Anything%20else");
	const fallback = await request.get("/og");

	expect(known.headers()["content-type"]).toBe("image/png");
	expect(Buffer.compare(await unknown.body(), await fallback.body())).toBe(0);
	expect(Buffer.compare(await known.body(), await fallback.body())).not.toBe(0);
});
