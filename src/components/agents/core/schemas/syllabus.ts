import z from "zod"
import { UnitSchema } from "./unit"

export const TrackJsonSchema = z.object({
	name: z.string(),
	units: z.array(UnitSchema),
})

export const TrackSyllabusSchema = TrackJsonSchema.pick({
	name: true,
})

export const SectionSyllabusSchema = z.object({
	name: z.string(),
	tracks: z.array(TrackSyllabusSchema),
})

export const SyllabusSchema = z.object({
	name: z.string(),
	sections: z.array(SectionSyllabusSchema),
})

export type SyllabusType = z.infer<typeof SyllabusSchema>
