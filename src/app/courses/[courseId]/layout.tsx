import CreateSectionModal from "@/components/cards/sectionCard/createSectionModal/CreateSectionModal"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			{children}
			<CreateSectionModal />
		</>
	)
}
