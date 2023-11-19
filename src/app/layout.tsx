import type { Metadata } from "next";
import { Gilda_Display } from "next/font/google";
import "@/src/reset.scss";
import "@/src/global.scss";
import Header from "@/src/components/header/Header";
import MainContent from "@/src/components/maincontent/MainContent";
import Providers from "@/src/components/providers/Providers";

import styles from "./page.module.scss";

const gildaFont = Gilda_Display({
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
			<body className={gildaFont.className}>
				<Providers>
					<Header></Header>
					<div className={styles.page}>
						<MainContent>{children}</MainContent>
					</div>
				</Providers>
			</body>
		</html>
	);
}
