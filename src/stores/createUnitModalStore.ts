import { create } from "zustand"

type CreateUnitModalState = {
	isOpen: boolean
	open: () => void
	close: () => void
}

export const useCreateUnitModalStore = create<CreateUnitModalState>((set) => ({
	isOpen: false,
	open: () => {
		console.log("OPEN")
		set({ isOpen: true })
	},
	close: () => set({ isOpen: false }),
}))
