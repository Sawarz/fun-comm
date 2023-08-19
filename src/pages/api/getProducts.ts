import { prisma } from "@/src/utils/db"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const products = await prisma.product.findMany();
  res.status(200).json(products)
}