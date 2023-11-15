import React from "react";
import { Product } from "@prisma/client";
import styles from "./ProductCard.module.scss";
import axios from "axios";

interface Props {
	product: Product;
}

export default function ProductCard(props: Props) {
	const { product } = props;

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

	return (
		<div
			className={styles.product}
			key={product.name}
		>
			<div className={styles.name}>{product.name}</div>
			<div className={styles.price}>{product.price} zł</div>
			<button onClick={() => buy(product.price, product.name)}>
				BUY
			</button>
		</div>
	);
}
