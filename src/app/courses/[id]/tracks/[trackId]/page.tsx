import ArrowBack from "@/components/arrowBack/ArrowBack"
import { ITrack } from "@/core/interfaces"
import styles from "./page.module.css"
import UnitCard from "@/components/unitCard/UnitCard"

type Props = {
	params: Promise<{
		id: string
		trackId: string
	}>
}

const getTrack = async (id: string): Promise<ITrack> => {
	try {
		const res = await fetch(`http://localhost:4200/api/tracks/${id}`, {
			cache: "no-cache",
		})

		return await res.json()
	} catch (error) {
		throw new Error(`Unable to fetch a track: ${error}`)
	}
}

export default async function Track({ params }: Props) {
	const { id: courseId, trackId } = await params

	const track: ITrack = await getTrack(trackId)

	return (
		<div className={styles.track}>
			<ArrowBack href={`/courses/${courseId}`} text="Back to course" />
			<h1 className={styles.title}>{track.name}</h1>
			<div className={styles.metadata}>
				<span>Units: {track.units.length}</span>
			</div>

			<ul className={styles.units}>
				{track.units.map((unit) => (
					<UnitCard
						key={unit.id}
						unit={unit}
						courseId={courseId}
						trackId={trackId}
					/>
				))}
			</ul>
		</div>
	)
}
