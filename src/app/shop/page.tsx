import React from "react";
import axios from "axios";
import { server } from "@/src/config/index";
import ProductList from "@/src/components/productlist/ProductList";

import styles from "./page.module.css";

export default async function Shop() {
	const { data: products } = await axios.get(`${server}/api/getProducts`);

	return (
		<div className={styles.shop}>
			<ProductList products={products} />
		</div>
	);
}
