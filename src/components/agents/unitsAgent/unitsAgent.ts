"use server"

import OpenAI from "openai"
import { zodResponseFormat } from "openai/helpers/zod.mjs"
import { UnitSchema } from "../core/schemas/unit"

const client = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

export const unitsAgent = async (topic: string) => {
	try {
		const res = await client.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [
				{
					role: "system",
					content:
						"You need to create 6 units with 8-12 exercises each by given topic and level. Type of tasks: translate from source language to target language or vice versa",
				},
				{
					role: "user",
					content: `
            Topic: ${topic}
          `,
				},
			],
			response_format: zodResponseFormat(UnitSchema, "unit"),
		})

		if (res.choices[0].message.content) {
			return res.choices[0].message.content
		}
	} catch (error) {
		throw new Error(`Units agent failure: ${error}`)
	}
}
