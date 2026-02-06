"use client"

import deleteCourseAction from "@/app/actions/courses/deleteCourse"
import styles from "./courseCardActions.module.css"

type Props = {
	courseId: string
}

export default function CourseCardActions({ courseId }: Props) {
	return (
		<div className={styles.buttons}>
			<button className={styles.btn} suppressHydrationWarning>
				Edit
			</button>
			<button
				onClick={() => deleteCourseAction(courseId)}
				className={styles.btn}
				suppressHydrationWarning
			>
				Delete
			</button>
		</div>
	)
}
