"use client";

import { useState } from "react";
import axios from "axios";
import { server } from "@/src/config/index";
import { Product } from "@prisma/client";
import { ProductListType } from "@/src/types/ProductList";

interface Props {
	productId: number;
	products: Array<Product>;
	setProducts: Function;
}

export default function ProductActions(props: Props) {
	const { productId, products, setProducts } = props;

	return (
		<div>
			<button
				onClick={() => {
					axios
						.post(`${server}/api/deleteProduct`, {
							id: productId,
						})
						.then(function (response) {
							const newProducts = products.filter(
								({ id }) => id !== productId
							);

							if (response.status === 200) {
								setProducts(newProducts);
							} else {
								console.error(response);
							}
						});
				}}
			>
				Remove
			</button>
		</div>
	);
}
