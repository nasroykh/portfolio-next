import { defineConfig } from "@playwright/test";

const PORT = 3100;

// Smoke tests against a production build: run `pnpm build` first.
// Uses the locally installed Chrome, so no Playwright browser download is needed.
export default defineConfig({
	testDir: "tests/e2e",
	fullyParallel: true,
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI ? "github" : "list",
	use: {
		baseURL: `http://localhost:${PORT}`,
		channel: "chrome",
		trace: "retain-on-failure",
	},
	webServer: {
		command: `pnpm start --port ${PORT}`,
		url: `http://localhost:${PORT}/robots.txt`,
		reuseExistingServer: !process.env.CI,
		timeout: 60_000,
	},
});
