import { create } from "zustand"

type CreateTrackModalState = {
	isOpen: boolean
	open: () => void
	close: () => void
}

export const useCreateTrackModalStore = create<CreateTrackModalState>((set) => ({
	isOpen: false,
	open: () => {
		console.log("OPEN")
		set({ isOpen: true })
	},
	close: () => set({ isOpen: false }),
}))
