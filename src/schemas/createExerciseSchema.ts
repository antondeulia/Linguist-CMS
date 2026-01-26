import { z } from "zod"

export const createExerciseSchema = z.object({
	name: z.string().min(1, "Name is required"),
	text: z.string().min(1, "Text language should not be empy"),
	direction: z.string().min(1, "Source language should not be empty"),
})

export type CreateExerciseForm = z.infer<typeof createExerciseSchema>
