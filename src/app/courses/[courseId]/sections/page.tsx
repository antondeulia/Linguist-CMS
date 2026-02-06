import { apiFetch } from "@/lib"

import styles from "./page.module.css"
import SectionCard from "@/components/cards/sectionCard/SectionCard"
import { ISection } from "@/core/interfaces"
import ArrowBack from "@/components/ui/arrowBack/ArrowBack"
import CreateSectionCard from "@/components/cards/sectionCard/createSectionCard/CreateSectionCard"

type Props = {
	params: Promise<{
		courseId: string
	}>
}

const getSections = async (courseId: string): Promise<ISection[]> => {
	return await apiFetch(`/sections/admin/${courseId}`)
}

export default async function Sections({ params }: Props) {
	const { courseId } = await params

	const sections = await getSections(courseId)

	return (
		<div className={styles.wrapper}>
			<ArrowBack href="/" text="Back to courses" />
			<h1 className={styles.title}>Sections:</h1>

			<ul className={styles.sections}>
				{sections.map((section: ISection) => (
					<SectionCard key={section.id} section={section} courseId={courseId} />
				))}

				<CreateSectionCard />
			</ul>
		</div>
	)
}
