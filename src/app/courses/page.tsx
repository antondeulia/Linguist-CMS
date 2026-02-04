import CourseCard from "@/components/courseCard/CourseCard"
import { ICourse } from "@/core/interfaces"
import styles from "./page.module.css"
import ArrowBack from "@/components/arrowBack/ArrowBack"
import CreateCourseCard from "@/components/courseCard/createCourseCard/CreateCourseCard"

const getCourses = async (): Promise<ICourse[]> => {
	try {
		const res = await fetch("http://localhost:4200/api/courses", {
			cache: "no-cache",
		})

		return await res.json()
	} catch (error) {
		throw new Error("Unable to fetch courses")
	}
}

export default async function Courses() {
	const courses = await getCourses()

	return (
		<div className={styles.wrapper}>
			<ArrowBack href="/" text="Back to dashboard" />
			<h1 className={styles.title}>Courses:</h1>

			<input
				className={styles.input}
				type="text"
				placeholder="Search for a course..."
			/>

			<ul className={styles.cards}>
				{courses.map((course) => (
					<CourseCard key={course.id} course={course} />
				))}

				<CreateCourseCard />
			</ul>
		</div>
	)
}
