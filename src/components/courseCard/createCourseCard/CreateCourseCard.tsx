"use client"

import { useCreateCourseModalStore } from "@/stores/createCourseModalStore"
import styles from "./createCourseCard.module.css"

export default function CreateCourseCard() {
	const open = useCreateCourseModalStore((s) => s.open)

	return (
		<li className={styles.card}>
			<button onClick={open} className={styles.btn}>
				<span className={styles.plus}>+</span> <span>Add course</span>
			</button>
		</li>
	)
}
