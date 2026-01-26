"use server"

import { apiFetch } from "@/lib"
import { CreateCourseForm } from "@/schemas/createCourseSchema"
import { revalidatePath } from "next/cache"

export default async function createCourseAction(data: CreateCourseForm) {
	await apiFetch("/courses", {
		method: "POST",
		body: JSON.stringify({ ...data }),
	})

	revalidatePath("/courses")
}
