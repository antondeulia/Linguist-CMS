import { courseAgent } from "@/components/agents/course/course"
import { SyllabusType } from "../../components/agents/core/schemas/syllabus"
import { unitsAgent } from "@/components/agents/unitsAgent/unitsAgent"

export default async function Users() {
	const course: string | null = await courseAgent("Hallo")

	const parsed: SyllabusType = JSON.parse(course)

	for (const section of parsed.sections) {
		for (const track of section.tracks) {
			const units = await unitsAgent(track.name)

			console.log(JSON.parse(units || ""), " <= Units here")
		}
	}

	return <div>In Development...</div>
}
