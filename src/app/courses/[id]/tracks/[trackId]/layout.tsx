import CreateUnitModal from "@/components/unitCard/createUnitModal/CreateUnitModal"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			{children}
			<CreateUnitModal />
		</>
	)
}
