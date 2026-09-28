import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	poweredByHeader: false,
	// NAS.md is read at runtime by /api/init-db to (re)build the vector index
	outputFileTracingIncludes: {
		"/api/init-db": ["./NAS.md"],
	},
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{ key: "X-Content-Type-Options", value: "nosniff" },
					{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
					{ key: "X-Frame-Options", value: "DENY" },
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=()",
					},
				],
			},
		];
	},
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
