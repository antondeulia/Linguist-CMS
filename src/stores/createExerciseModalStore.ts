import { create } from "zustand"

type CreateExerciseModalState = {
	isOpen: boolean
	open: () => void
	close: () => void
}

export const useCreateExerciseModalStore = create<CreateExerciseModalState>((set) => ({
	isOpen: false,
	open: () => {
		console.log("OPEN")
		set({ isOpen: true })
	},
	close: () => set({ isOpen: false }),
}))
