import { create } from "zustand"

type CreateSectionModalState = {
	isOpen: boolean
	open: () => void
	close: () => void
}

export const useCreateSectionModalStore = create<CreateSectionModalState>((set) => ({
	isOpen: false,
	open: () => {
		console.log("OPEN")
		set({ isOpen: true })
	},
	close: () => set({ isOpen: false }),
}))
