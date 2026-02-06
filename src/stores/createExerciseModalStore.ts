import { create } from "zustand"

type CreateExerciseModalState = {
	isOpen: boolean
	open: () => void
	close: () => void
}

export const useCreateExerciseModalStore = create<CreateExerciseModalState>((set) => ({
	isOpen: false,
	open: () => {
		set({ isOpen: true })
	},
	close: () => set({ isOpen: false }),
}))
