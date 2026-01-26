import CreateExerciseModal from "@/components/exerciseCard/createExerciseModal/CreateExerciseModal"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			{children}
			<CreateExerciseModal />
		</>
	)
}
