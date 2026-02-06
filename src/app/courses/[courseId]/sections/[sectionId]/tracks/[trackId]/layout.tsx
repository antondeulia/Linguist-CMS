import CreateUnitModal from "@/components/cards/unitCard/createUnitModal/CreateUnitModal"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			{children}
			<CreateUnitModal />
		</>
	)
}
