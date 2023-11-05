import React from "react";

export default function Payment({ searchParams }: { searchParams: any }) {
	return <div>{JSON.stringify(searchParams)}</div>;
}
