"use client"

import deleteCourseAction from "@/app/actions/courses/deleteCourse"
import styles from "./courseCardActions.module.css"

type Props = {
	id: string
}

export default function CourseCardActions({ id }: Props) {
	return (
		<div className={styles.buttons}>
			<button className={styles.btn}>Edit</button>
			<button onClick={() => deleteCourseAction(id)} className={styles.btn}>
				Delete
			</button>
		</div>
	)
}
