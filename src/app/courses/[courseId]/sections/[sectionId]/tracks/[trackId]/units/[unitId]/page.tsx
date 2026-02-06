import ArrowBack from "@/components/ui/arrowBack/ArrowBack"
import styles from "./page.module.css"
import { IUnit } from "@/core/interfaces"
import ExerciseCard from "@/components/cards/exerciseCard/ExerciseCard"
import CreateExerciseCard from "@/components/cards/exerciseCard/createExerciseCard/CreateExerciseCard"
import { apiFetch } from "@/lib"

type Props = {
	params: Promise<{
		courseId: string
		trackId: string
		unitId: string
		sectionId: string
	}>
}

const getUnit = async (unitId: string): Promise<IUnit> => {
	return await apiFetch(`/units/${unitId}`)
}

export default async function Unit({ params }: Props) {
	const { courseId, trackId, unitId, sectionId } = await params

	const unit: IUnit = await getUnit(unitId)

	console.log(unit)

	return (
		<div className={styles.unit}>
			<ArrowBack
				href={`/courses/${courseId}/sections/${sectionId}/tracks/${trackId}`}
				text="Back to units"
			/>
			<h1 className={styles.title}>{unit.name}</h1>
			<div className={styles.metadata}>
				<span>Exercises:</span>
			</div>

			<ul className={styles.exercises}>
				{unit.exercises.map((exercise) => (
					<ExerciseCard
						key={exercise.id}
						exercise={exercise}
						courseId={courseId}
						trackId={trackId}
						unitId={unitId}
					/>
				))}

				<CreateExerciseCard />
			</ul>
		</div>
	)
}
