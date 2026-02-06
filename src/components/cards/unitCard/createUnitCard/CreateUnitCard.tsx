"use client"

import { useCreateUnitModalStore } from "@/stores"
import styles from "./createUnitCard.module.css"

export default function CreateUnitCard() {
	const open = useCreateUnitModalStore((s) => s.open)

	return (
		<li className={styles.card}>
			<button onClick={open} className={styles.btn}>
				<span className={styles.plus}>+</span> <span>Add unit</span>
			</button>
		</li>
	)
}
