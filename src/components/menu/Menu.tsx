import React from "react";
import styles from "./Menu.module.scss";
import Link from "next/link";

export default function Menu() {
	return (
		<div className={styles.Menu}>
			<div className={styles.MenuItem}>
				<Link href='/home'>Home</Link>
			</div>
			<div className={styles.MenuItem}>
				<Link href='/shop'>Shop</Link>
			</div>
		</div>
	);
}
