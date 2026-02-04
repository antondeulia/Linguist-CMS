import TrackCard from "@/components/trackCard/TrackCard"
import { ICourse } from "@/core/interfaces"
import styles from "./page.module.css"
import ArrowBack from "@/components/arrowBack/ArrowBack"
import CreateTrackCard from "@/components/trackCard/createTrackCard/CreateTrackCard"

const getCourse = async (id: string): Promise<ICourse> => {
	try {
		const res = await fetch(`http://localhost:4200/api/courses/${id}`, {
			cache: "no-cache",
		})

		return await res.json()
	} catch (error) {
		throw new Error(`Unable to fetch a course: ${error}`)
	}
}

type Props = {
	params: Promise<{
		id: string
	}>
}

export default async function Course({ params }: Props) {
	const { id } = await params

	const course: ICourse = await getCourse(id)

	return (
		<div className={styles.course}>
			<ArrowBack href={"/courses"} text="Back to courses" />
			<h1 className={styles.title}>{course.name}</h1>
			<div className={styles.metadata}>
				<span>Tracks: {course.tracks.length}</span>
			</div>

			<ul className={styles.tracks}>
				{course.tracks.map((track) => (
					<TrackCard key={track.id} track={track} courseId={course.id} />
				))}

				<CreateTrackCard />
			</ul>
		</div>
	)
}
