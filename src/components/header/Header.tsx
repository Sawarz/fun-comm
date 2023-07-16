import Link from "next/link";
import styles from "./Header.module.scss";
import Menu from "@/src/components/menu/Menu";

export default function Header() {
	return (
		<div className={styles.Header}>
			<Menu />
		</div>
	);
}
