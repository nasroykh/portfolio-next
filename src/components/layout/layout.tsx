import Footer from "./footer";
import { Header, NAV_ITEMS } from "./header";

export const Layout = ({
	children,
	activePath,
}: {
	children: React.ReactNode;
	activePath: (typeof NAV_ITEMS)[number]["name"];
}) => {
	return (
		<>
			<main className="min-h-screen min-w-0 mt-4 sm:mt-6 flex flex-col px-2 sm:px-0">
				<Header activePath={activePath} />
				{children}
				<Footer />
			</main>
		</>
	);
};
