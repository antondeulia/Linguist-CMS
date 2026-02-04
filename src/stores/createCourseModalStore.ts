import { create } from "zustand"

type CreateCourseModalState = {
	isOpen: boolean
	open: () => void
	close: () => void
}

export const useCreateCourseModalStore = create<CreateCourseModalState>((set) => ({
	isOpen: false,
	open: () => {
		set({ isOpen: true })
	},
	close: () => set({ isOpen: false }),
}))
