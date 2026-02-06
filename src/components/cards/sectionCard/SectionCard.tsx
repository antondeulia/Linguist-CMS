import { ISection } from "@/core/interfaces"
import styles from "./sectionCard.module.css"
import Link from "next/link"

type Props = {
	section: ISection
	courseId: string
}

export default function SectionCard({ section, courseId }: Props) {
	return (
		<li className={styles.section}>
			<Link
				href={`/courses/${courseId}/sections/${section.id}`}
				className={styles.link}
			/>
			<div>
				<p className={styles.title}>{section.name}</p>

				<div></div>
			</div>
		</li>
	)
}
