import TrackCard from "@/components/cards/trackCard/TrackCard"
import { ISection, ITrack } from "@/core/interfaces"
import { apiFetch } from "@/lib"
import styles from "./page.module.css"
import CreateTrackCard from "@/components/cards/trackCard/createTrackCard/CreateTrackCard"
import ArrowBack from "@/components/ui/arrowBack/ArrowBack"

const getSection = async (id: string): Promise<ISection> => {
	return await apiFetch(`/sections/admin/one/${id}`)
}

type Props = {
	params: Promise<{
		sectionId: string
		courseId: string
	}>
}

export default async function Section({ params }: Props) {
	const { sectionId, courseId } = await params

	const section = await getSection(sectionId)

	console.log(section)

	return (
		<div className={styles.section}>
			<ArrowBack text="Back to sections" href={`/courses/${courseId}/sections`} />
			<h1 className={styles.title}>Tracks:</h1>

			<ul className={styles.tracks}>
				{section.tracks.map((track: ITrack) => (
					<TrackCard
						key={track.id}
						track={track}
						courseId={courseId}
						sectionId={sectionId}
					/>
				))}

				<CreateTrackCard />
			</ul>
		</div>
	)
}
