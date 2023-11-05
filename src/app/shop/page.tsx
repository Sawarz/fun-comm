import React from "react";
import { server } from "@/src/config/index";
import ProductList from "@/src/components/productlist/ProductList";

import styles from "./page.module.css";

const getProducts = async (): Promise<any> => {
	const data = await fetch(`${server}/api/getProducts`);
	const products = await data.json();

	return products;
};

export default async function Shop() {
	const products = await getProducts();

	return (
		<div className={styles.shop}>
			<ProductList products={products} />
		</div>
	);
}
