import { Footer } from "./footer";
import { Header } from "./header";

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="relative flex flex-col min-h-screen max-w-xl md:max-w-4xl mx-auto space-y-12 px-4">
			<Header />
			<main id="main">{children}</main>
			<Footer />
		</div>
	);
};
