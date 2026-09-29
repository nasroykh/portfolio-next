import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { defaultLocale, locales } from "@/i18n/config";

type Messages = { [key: string]: string | Messages };

const load = (locale: string): Messages =>
	JSON.parse(
		fs.readFileSync(path.join(process.cwd(), "messages", `${locale}.json`), "utf8"),
	);

const flatten = (messages: Messages, prefix = ""): [string, string][] =>
	Object.entries(messages).flatMap(([key, value]) =>
		typeof value === "string"
			? [[`${prefix}${key}`, value]]
			: flatten(value, `${prefix}${key}.`),
	);

const placeholders = (text: string) =>
	[...text.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();

const reference = new Map(flatten(load(defaultLocale)));

// Every locale must stay in sync with English: a missing key throws at runtime on that page
describe.each(locales.filter((locale) => locale !== defaultLocale))(
	"messages/%s.json",
	(locale) => {
		const messages = new Map(flatten(load(locale)));

		it("has exactly the English keys", () => {
			expect([...messages.keys()].sort()).toEqual([...reference.keys()].sort());
		});

		it("has no empty strings", () => {
			const empty = [...messages].filter(([, value]) => !value.trim());
			expect(empty).toEqual([]);
		});

		it("keeps the same placeholders", () => {
			const mismatched = [...reference]
				.filter(
					([key, value]) =>
						placeholders(value).join() !==
						placeholders(messages.get(key) ?? "").join(),
				)
				.map(([key]) => key);
			expect(mismatched).toEqual([]);
		});
	},
);
