import { z } from "zod"

export const createUnitSchema = z.object({
	name: z.string().min(1, "Name is required"),
})

export type CreateUnitForm = z.infer<typeof createUnitSchema>
