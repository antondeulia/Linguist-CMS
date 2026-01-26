"use server"

import { revalidatePath } from "next/cache"

export default async function createUnitAction(data: { name: string; trackId: string }) {
	const res = await fetch("http://localhost:4200/api/units", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ ...data }),
	})

	if (!res.ok) {
		const error = await res.text()
		throw new Error(`Unable to create a new unit: ${error}`)
	}

	revalidatePath("/units")
}
