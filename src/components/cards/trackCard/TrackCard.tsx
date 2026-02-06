import { ITrack } from "@/core/interfaces"
import styles from "./trackCard.module.css"
import Link from "next/link"

type Props = {
	track: ITrack
	courseId: string
	sectionId: string
}

export default function TrackCard({ track, courseId, sectionId }: Props) {
	return (
		<li className={styles.track}>
			<Link
				href={`/courses/${courseId}/sections/${sectionId}/tracks/${track.id}`}
				className={styles.link}
			/>
			<h2 className={styles.title}>{track.name}</h2>
			<p className={styles.metadata}>Units: {track.units.length}</p>
		</li>
	)
}
