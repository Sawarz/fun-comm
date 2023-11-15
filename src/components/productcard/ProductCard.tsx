import React, { useState } from "react";
import { Product } from "@prisma/client";
import styles from "./ProductCard.module.scss";
import axios from "axios";

interface Props {
	product: Product;
}

export default function ProductCard(props: Props) {
	const { product } = props;

	const [loading, setLoading] = useState(false);

	const buy = async (price: number, name: string) => {
		setLoading(true);

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

		if (data.url) {
			window.location.assign(data.url);
		}

		setLoading(false);
	};

	return (
		<div
			className={styles.product}
			key={product.name}
		>
			<div className={styles.name}>{product.name}</div>
			<div className={styles.price}>{product.price} zł</div>
			<button
				className={styles.buyButton}
				onClick={() => buy(product.price, product.name)}
			>
				{loading ? "ADDING..." : "BUY"}
			</button>
		</div>
	);
}
