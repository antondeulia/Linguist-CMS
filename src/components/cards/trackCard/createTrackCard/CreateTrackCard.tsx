"use client"

import { useCreateTrackModalStore } from "@/stores"
import styles from "./createTrackCard.module.css"

export default function CreateTrackCard() {
	const open = useCreateTrackModalStore((s) => s.open)

	return (
		<li className={styles.card}>
			<button onClick={open} className={styles.btn}>
				<span className={styles.plus}>+</span> <span>Add track</span>
			</button>
		</li>
	)
}
