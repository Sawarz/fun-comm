import React from "react";

export default function Payment({ searchParams }: { [key: string]: never }) {
	return <div>{JSON.stringify(searchParams)}</div>;
}
