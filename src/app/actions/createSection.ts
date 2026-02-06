"use server"

import { revalidatePath } from "next/cache"

export default async function createSectionAction(data: {
	name: string
	courseId: string
}) {
	const res = await fetch("http://localhost:4200/api/sections", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ ...data }),
	})

	if (!res.ok) {
		const error = await res.text()
		throw new Error(`Unable to create a new track: ${error}`)
	}

	revalidatePath("/tracks")
}
