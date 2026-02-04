import CreateTrackModal from "@/components/trackCard/createTrackModal/CreateTrackModal"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			{children}
			<CreateTrackModal />
		</>
	)
}
