"use client";

import { Product } from "@prisma/client";
import React from "react";
import { ProductListType } from "@/src/types/ProductList";
import axios from "axios";

export default function ProductList(props: ProductListType) {
	const { products } = props;

	const buy = async (price: number, name: string) => {
		const { data } = await axios.post(
			"/api/stripe",
			{
				price,
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
			<div>
				<div>{product.name}</div>
				<div>{product.price}</div>
				<button onClick={() => buy(product.price, product.name)}>
					BUY
				</button>
			</div>
		);
	});
}
