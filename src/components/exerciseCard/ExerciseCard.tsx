import { IExercise } from "@/core/interfaces"
import styles from "./exerciseCard.module.css"
import Link from "next/link"

type Props = {
	exercise: IExercise
	courseId: string
	trackId: string
	unitId: string
}

export default function ExerciseCard({ exercise, courseId, trackId, unitId }: Props) {
	return (
		<li className={styles.exercise}>
			<Link
				href={`/courses/${courseId}/tracks/${trackId}/units/${unitId}`}
				className={styles.link}
			/>
			<div>
				<p className={styles.title}>{exercise.type}</p>

				<div></div>
			</div>
		</li>
	)
}
