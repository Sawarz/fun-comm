import React, { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import styles from "./ProductCard.module.scss";
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
		const loadImage = async () => {
			try {
				const gsReference = ref(
					storage,
					`gs://fun-comm.appspot.com/${product.uuid}`
				);

				const downloadURL = await getDownloadURL(gsReference);

				setImageUrl(downloadURL);
			} catch {
				setImageUrl("/placeholders/notfound.jpg");
			}
		};

		loadImage();
	}, [product.uuid]);

	const buy = async (price: number, name: string) => {
		setLoading(true);

		try {
			const data = await fetch("/api/stripe", {
				method: "POST",
				body: JSON.stringify({
					price: (parseFloat(price.toFixed(2)) * 100).toFixed(0),
					name,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const dataParsed = await data.json();

			const { url } = dataParsed;

			if (url) {
				window.location.assign(url);
			}

			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div
			className={styles.product}
			key={product.name}
		>
			<Image
				src={imageUrl}
				alt='uploaded image'
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
				{loading ? "ADDING..." : "ADD TO CART"}
			</button>
		</div>
	);
}
