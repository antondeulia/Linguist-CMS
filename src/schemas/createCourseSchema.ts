import { z } from "zod"

export const createCourseSchema = z
	.object({
		name: z.string().min(1, "Course name is required"),
		sourceLang: z.string().min(1, "Source language is required"),
		targetLang: z.string().min(1, "Target language is required"),
	})
	.refine((data) => data.sourceLang !== data.targetLang, {
		error: "Source and target languages cannot be the same",
		path: ["to"],
	})

export type CreateCourseForm = z.infer<typeof createCourseSchema>
