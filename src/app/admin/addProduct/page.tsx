"use client";

import { useState } from "react";
import axios from "axios";
import { server } from "@/src/config/index";

export default function AddProduct() {
	const [name, setName] = useState("test");
	const [price, setPrice] = useState(999.99);

	return (
		<div>
			<label>Name</label>
			<input onChange={(e) => setName(e.target.value)}></input>
			<label>Price</label>
			<input
				type='number'
				onChange={(e) => setPrice(parseFloat(e.target.value))}
			></input>
			<button
				onClick={() => {
					axios.post(`${server}/api/addProduct`, {
						name,
						price,
					});
				}}
			>
				Add
			</button>
		</div>
	);
}
