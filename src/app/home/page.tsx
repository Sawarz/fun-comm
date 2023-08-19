import React from "react";
import { prisma } from "@/src/utils/db";

export default async function home() {
	const users = await prisma.user.findMany();

	return (
		<div>
			<div>{JSON.stringify(users)}</div>
		</div>
	);
}
