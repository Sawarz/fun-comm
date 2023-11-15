"use client";

import { Product } from "@prisma/client";
import React from "react";
import { ProductListType } from "@/src/types/ProductList";

import styles from "./ProductList.module.scss";
import ProductCard from "../productcard/ProductCard";

export default function ProductList(props: ProductListType) {
	const { products } = props;

	return (
		<div className={styles.productList}>
			{products.map((product: Product) => (
				<ProductCard
					key={product.name}
					product={product}
				/>
			))}
		</div>
	);
}
