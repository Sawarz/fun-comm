import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../reset.scss";
import Header from "@/src/components/header/Header";
import MainContent from "../components/maincontent/MainContent";

const inter = Inter({ subsets: ["latin"] });

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
			<body className={inter.className}>
				<Header></Header>
				<MainContent>{children}</MainContent>
			</body>
		</html>
	);
}
