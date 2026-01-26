import { ICourse } from "@/core/interfaces"
import styles from "./courseCard.module.css"
import Link from "next/link"
import CourseCardActions from "./CourseCardActions/CourseCardActions"

type Props = {
	course: ICourse
}

export default function CourseCard({ course }: Props) {
	return (
		<li className={styles.card}>
			<Link href={`/courses/${course.id}`} className={styles.link} />
			<h2 className={styles.title}>{course.name}</h2>
			<div className={styles.lang}>
				<span>{course.sourceLang}</span>
				<span>{" => "}</span>
				<span>{course.targetLang}</span>
			</div>

			<CourseCardActions id={course.id} />
		</li>
	)
}
