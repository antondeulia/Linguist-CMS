import { ICourse } from "@/core/interfaces"
import styles from "./page.module.css"
import ArrowBack from "@/components/ui/arrowBack/ArrowBack"
import SectionCard from "@/components/cards/sectionCard/SectionCard"
import { apiFetch } from "@/lib"
import CreateSectionCard from "@/components/cards/sectionCard/createSectionCard/CreateSectionCard"

const getCourse = async (courseId: string): Promise<ICourse> => {
	return await apiFetch(`/courses/${courseId}`)
}

type Props = {
	params: Promise<{
		courseId: string
	}>
}

export default async function Course({ params }: Props) {
	const { courseId } = await params

	const course: ICourse = await getCourse(courseId)

	return (
		<div className={styles.course}>
			<ArrowBack href={"/courses"} text="Back to courses" />
			<h1 className={styles.title}>{course.name}</h1>
			<div className={styles.metadata}>
				<span>Sections: {course.sections.length}</span>
			</div>

			<ul className={styles.tracks}>
				{course.sections.map((section) => (
					<SectionCard
						key={section.id}
						section={section}
						courseId={course.id}
					/>
				))}

				<CreateSectionCard />
			</ul>
		</div>
	)
}
