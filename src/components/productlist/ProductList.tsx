"use client";

import { Product } from "@prisma/client";
import React from "react";
import { ProductListType } from "@/src/types/ProductList";
import axios from "axios";

import styles from "./ProductList.module.css";

export default function ProductList(props: ProductListType) {
	const { products } = props;

	const buy = async (price: number, name: string) => {
		const { data } = await axios.post(
			"/api/stripe",
			{
				price: (parseFloat(price.toFixed(2)) * 100).toFixed(0),
				name,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		window.location.assign(data.url);
		(window as any).testValue = data.shipping_details;
	};

	return products.map((product: Product) => {
		return (
			<div className={styles.product}>
				<div className={styles.productName}>{product.name}</div>
				<div className={styles.productPrice}>{product.price} zł</div>
				<button onClick={() => buy(product.price, product.name)}>
					BUY
				</button>
			</div>
		);
	});
}
