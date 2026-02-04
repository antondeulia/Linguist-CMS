import ArrowBack from "@/components/arrowBack/ArrowBack"
import styles from "./page.module.css"
import { IUnit } from "@/core/interfaces"
import ExerciseCard from "@/components/exerciseCard/ExerciseCard"
import CreateExerciseCard from "@/components/exerciseCard/createExerciseCard/CreateExerciseCard"

type Props = {
	params: Promise<{
		id: string
		trackId: string
		unitId: string
	}>
}

const getUnit = async (id: string): Promise<IUnit> => {
	try {
		const res = await fetch(`http://localhost:4200/api/units/${id}`, {
			cache: "no-cache",
		})

		return await res.json()
	} catch (error) {
		throw new Error(`Unable to fetch an unit: ${error}`)
	}
}

export default async function Unit({ params }: Props) {
	const { id: courseId, trackId, unitId } = await params

	const unit: IUnit = await getUnit(unitId)

	return (
		<div className={styles.unit}>
			<ArrowBack
				href={`/courses/${courseId}/tracks/${trackId}`}
				text="Back to track"
			/>
			<h1 className={styles.title}>{unit.name}</h1>
			<div className={styles.metadata}>
				<span>Units: {unit._count?.exercises}</span>
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
