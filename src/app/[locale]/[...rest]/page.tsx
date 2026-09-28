import { notFound } from "next/navigation";

// Unknown paths under a locale render the localized not-found page instead of Next's default one
export default function CatchAllPage() {
	notFound();
}
