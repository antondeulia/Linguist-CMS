import z from "zod"

export const SegmentSchema = z.object({
	text: z.string().describe("A word (or a group of words if used together)"),
	translation: z.string().describe("Translation of the word into the target language"),
})

export const ExerciseSchema = z.object({
	rawText: z.string(),
	segments: z
		.array(SegmentSchema)
		.describe("Each word (or group of words) should be divided into segments"),
})

export const UnitSchema = z.object({
	exercises: z.array(ExerciseSchema),
})
