import { Product } from "@prisma/client";

export type ProductListType = {
	products: Array<Product>;
};