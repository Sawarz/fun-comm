import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/src/reset.scss";
import "@/src/global.scss";
import Header from "@/src/components/header/Header";
import MainContent from "@/src/components/maincontent/MainContent";
import Providers from "@/src/components/providers/Providers";

const roboto = Roboto({
	weight: ["400"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Fun-comm",
	description: "Shopping made fun!",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={roboto.className}>
				<Providers>
					<Header></Header>
					<MainContent>{children}</MainContent>
				</Providers>
			</body>
		</html>
	);
}
