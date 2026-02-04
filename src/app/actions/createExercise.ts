"use server"

import { Segment } from "@/components/exerciseCard/createExerciseModal/textSegment/TextSegment"
import { revalidatePath } from "next/cache"

export type CreateExerciseInput = {
	name: string
	unitId: string
	rawText: string
	type: string
	direction: string
	segments: Segment[]
	hover: boolean
}

export default async function createExerciseAction(data: CreateExerciseInput) {
	const res = await fetch("http://localhost:4200/api/exercises", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ ...data }),
	})

	if (!res.ok) {
		const error = await res.text()
		throw new Error(`Unable to create a new exercise: ${error}`)
	}

	revalidatePath("/exercises")
}
