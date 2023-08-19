import { Product } from "@prisma/client";
import React from "react";

type ProductListType = {
	products: Array<Product>;
};

export default function ProductList(props: ProductListType) {
	const { products } = props;

	return products.map((product: Product) => {
		return (
			<div>
				<div>{product.name}</div>
				<div>{product.price}</div>
			</div>
		);
	});
}
