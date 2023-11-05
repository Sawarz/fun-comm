"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { server } from "@/src/config/index";
import { Product } from "@prisma/client";
import { ProductListType } from "@/src/types/ProductList";

import ProductActions from "@/src/admincomponents/ProductActions/ProductActions";

export default function Admin() {
	const [products, setProducts] = useState<Array<Product>>();

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`${server}/api/getProducts`);
			const json = await response.json();

			setProducts(json);
		};

		fetchData().catch(console.error);
	}, []);

	return (
		<div>
			<Link href='admin/addProduct'>Add product</Link>
			<div>
				{products?.map((product: Product) => {
					return (
						<div>
							<div>{product.name}</div>
							<div>{product.price}</div>
							<div>{product.id}</div>
							<ProductActions
								productId={product.id}
								products={products}
								setProducts={setProducts}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}
