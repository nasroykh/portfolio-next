import { AIAssistant } from "../ai-assistant";
import { Footer } from "./footer";
import { Header, NAV_ITEMS } from "./header";

export const Layout = ({
	children,
	activePath,
}: {
	children: React.ReactNode;
	activePath: (typeof NAV_ITEMS)[number]["name"];
}) => {
	return (
		<div className="relative min-h-screen max-w-xl md:max-w-2xl mx-auto space-y-12 px-4">
			<Header activePath={activePath} />
			<main>{children}</main>
			<AIAssistant />
			<Footer />
		</div>
	);
};
