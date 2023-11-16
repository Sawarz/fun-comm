import React, { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import styles from "./ProductCard.module.scss";
import axios from "axios";
import { storage } from "@/src/firebase/FirebaseCore";
import { ref, getDownloadURL } from "firebase/storage";
import Image from "next/image";

interface Props {
	product: Product;
}

export default function ProductCard(props: Props) {
	const { product } = props;

	const [imageUrl, setImageUrl] = useState("/placeholders/loading.png");

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const loadImage = async() => {
			const gsReference = ref(storage, `gs://fun-comm.appspot.com/${product.uuid}`);

			const downloadURL = await getDownloadURL(gsReference);
			setImageUrl(downloadURL);
		}

		loadImage();

	}, [product.uuid])

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
			<Image
				src={imageUrl}
				alt="uploaded image"
                priority={true}
				width={200}
				height={200}
				className={styles.image}
			></Image>
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
