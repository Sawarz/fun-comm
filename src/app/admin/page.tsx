"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function admin() {
	const { data: session } = useSession();

	if (session && session.user) {
		return (
			<div>
				<button onClick={() => signOut()}>Sign out</button>
				<div>{session.user.name}</div>
			</div>
		);
	}
	return (
		<div>
			<button onClick={() => signIn()}>Sign in</button>
		</div>
	);
}
