import { initDB } from "@/app/api/utils/init_db";

export async function GET() {
	try {
		await initDB();

		return Response.json({ success: true, message: "Database initialized" });
	} catch (error) {
		return Response.json({
			success: false,
			message: "Error: " + error,
		});
	}
}
