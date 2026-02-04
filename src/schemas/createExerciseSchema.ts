import { z } from "zod"

const DirectionEnum = ["fromSourceToTarget", "fromTargetToSource"]

export const createExerciseSchema = z.object({
	name: z.string().min(1, "Name is required"),
	text: z.string().min(1, "Text language should not be empy"),
	direction: z.enum(DirectionEnum),
})

export type CreateExerciseForm = z.infer<typeof createExerciseSchema>
