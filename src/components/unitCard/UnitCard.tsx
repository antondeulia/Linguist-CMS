import Link from "next/link"
import styles from "./unitCard.module.css"
import { IUnit } from "@/core/interfaces"

type Props = {
	unit: IUnit
	courseId: string
	trackId: string
}

export default function UnitCard({ unit, courseId, trackId }: Props) {
	return (
		<li className={styles.unit}>
			<Link
				href={`/courses/${courseId}/tracks/${trackId}/units/${unit.id}`}
				className={styles.link}
			/>
			<h2 className={styles.title}>{unit.name}</h2>
			<p className={styles.metadata}>Exercises: {unit._count.exercises}</p>
		</li>
	)
}
