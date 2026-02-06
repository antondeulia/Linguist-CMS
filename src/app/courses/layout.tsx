import CreateCourseModal from "@/components/cards/courseCard/createCourseModal/CreateCourseModal"

type Props = {
	children: React.ReactNode
}

export default function Layout({ children }: Props) {
	return (
		<>
			{children}
			<CreateCourseModal />
		</>
	)
}
