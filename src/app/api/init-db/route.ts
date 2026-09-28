import { timingSafeEqual } from "crypto";
import { initDB } from "@/app/api/utils/init_db";

export const dynamic = "force-dynamic";

const isAuthorized = (request: Request) => {
	const secret = process.env.INIT_DB_SECRET;
	if (!secret) return false;

	const provided = Buffer.from(request.headers.get("authorization") ?? "");
	const expected = Buffer.from(`Bearer ${secret}`);
	return (
		provided.length === expected.length && timingSafeEqual(provided, expected)
	);
};

// Wipes and re-embeds the vector collection (paid API calls), so it is never publicly callable.
// Usage: curl -X POST -H "Authorization: Bearer $INIT_DB_SECRET" https://<domain>/api/init-db
export async function POST(request: Request) {
	if (!isAuthorized(request)) {
		return Response.json(
			{ success: false, message: "Unauthorized" },
			{ status: 401 },
		);
	}

	try {
		const { vectors } = await initDB();
		return Response.json({
			success: true,
			message: `Database initialized with ${vectors} vectors`,
		});
	} catch (error) {
		console.error("Database initialization failed:", error);
		return Response.json(
			{ success: false, message: "Database initialization failed" },
			{ status: 500 },
		);
	}
}
