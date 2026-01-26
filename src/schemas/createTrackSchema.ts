import { z } from "zod"

export const createTrackSchema = z.object({
	name: z.string().min(1, "Name is required"),
})

export type CreateTrackForm = z.infer<typeof createTrackSchema>
