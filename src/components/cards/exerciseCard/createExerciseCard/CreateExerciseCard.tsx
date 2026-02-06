"use client"

import { useCreateExerciseModalStore } from "@/stores"
import styles from "./createExerciseCard.module.css"

export default function CreateExerciseCard() {
	const open = useCreateExerciseModalStore((s) => s.open)

	return (
		<li className={styles.card}>
			<button onClick={open} className={styles.btn}>
				<span className={styles.plus}>+</span> <span>Add exercise</span>
			</button>
		</li>
	)
}
