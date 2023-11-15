"use client";

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
				onClick={async () => {
					try {
						await fetch(`${server}/api/deleteProduct`, {
							method: "POST",
							body: JSON.stringify({
								id: productId,
							}),
						});

						const newProducts = products.filter(
							({ id }) => id !== productId
						);

						setProducts(newProducts);
					} catch (error) {
						console.error(error);
					}
				}}
			>
				Remove
			</button>
		</div>
	);
}
