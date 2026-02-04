"use server"

import { apiFetch } from "@/lib"
import { revalidatePath } from "next/cache"

export default async function deleteCourseAction(id: string) {
	await apiFetch(`/courses/${id}`, {
		method: "DELETE",
	})

	revalidatePath("/courses")
}
