"use server"

import OpenAI from "openai"
import { zodResponseFormat } from "openai/helpers/zod.mjs"
import { SyllabusSchema } from "../core/schemas/syllabus"

const client = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

export const courseAgent = async (prompt: string): Promise<string> => {
	try {
		const res = await client.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [
				{
					role: "system",
					content: `You're a linguist agent. You need to make JSON structure of a course, followed by this plan: 
              Course -> Sections (A1-C2) -> Tracks (different topic in each section, like starting from A2 - Greetings, Basic phrases, and so on until C2, each section should have at least 10 tracks -> each track should have 6 units -> each unit should have 8-12 exercises)
            `,
				},
				{
					role: "user",
					content: `
            I speak: English;
            I want to learn: Swedish;
          `,
				},
			],
			response_format: zodResponseFormat(SyllabusSchema, "syllabus"),
		})

		if (res.choices[0].message.content) {
			return res.choices[0].message.content
		}

		throw new Error()
	} catch (err) {
		throw new Error(`Unable to request openai api: ${err}`)
	}
}

type SegmentJson = {
	text: string
	translation: string
}

type ExerciseJson = {
	rawText: string
	segments: SegmentJson[]
}

type UnitJson = {
	exercises: ExerciseJson[]
}

type TrackJson = {
	name: string
	units: UnitJson[]
}

type SectionJson = {
	name: string
	tracks: TrackJson[]
}

type CourseJson = {
	name: string
	sections: SectionJson[]
}
