"use client";

import { useState } from "react";
import { server } from "@/src/config/index";
import FileUploader from "@/src/components/fileuploader/FileUploader";
import { v4 as uuidv4 } from 'uuid';

export default function AddProduct() {
	const [name, setName] = useState("test");
	const [price, setPrice] = useState(999.99);
	const [uuid, setUuid] = useState(uuidv4());

	return (
		<div>
			<label>Name</label>
			<input onChange={(e) => setName(e.target.value)}></input>
			<label>Price</label>
			<input
				type='number'
				onChange={(e) => setPrice(parseFloat(e.target.value))}
			></input>
			<FileUploader uuid={ uuid }/>
			<button
				onClick={async () => {
					try {
						await fetch(`${server}/api/addProduct`, {
							method: "POST",
							body: JSON.stringify({
								name,
								price,
								uuid
							})
						});
					} catch (error) {
						console.error(error)
					}
				}}
			>
				Add
			</button>
		</div>
	);
}
