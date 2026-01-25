import type { Metadata } from "next"
import "./globals.css"
import Sidebar from "@/components/sidebar/Sidebar"

export const metadata: Metadata = {
	title: "Linguist-CMS",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body>
				<Sidebar />
				<main>{children}</main>
			</body>
		</html>
	)
}
