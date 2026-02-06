"use client"

import { useCreateSectionModalStore } from "@/stores"
import styles from "./createSectionCard.module.css"

export default function CreateSectionCard() {
	const open = useCreateSectionModalStore((s) => s.open)

	return (
		<li className={styles.card}>
			<button onClick={open} className={styles.btn}>
				<span className={styles.plus}>+</span> <span>Add section</span>
			</button>
		</li>
	)
}
