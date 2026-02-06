import { z } from "zod"

export const createSectionSchema = z.object({
	name: z.string().min(1, "Name is required"),
})

export type CreateSectionForm = z.infer<typeof createSectionSchema>
