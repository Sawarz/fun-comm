import { prisma } from "@/src/utils/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const data = await request.json();

	const dbResponse = await prisma.product.create({ data: data });

	return NextResponse.json(dbResponse);
}
