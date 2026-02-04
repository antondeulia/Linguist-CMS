import type { Metadata } from "next"
import "./globals.css"
import Sidebar from "@/components/sidebar/Sidebar"
import Header from "@/components/header/Header"

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
				<div className="block">
					<Header />
					<main>{children}</main>
				</div>
			</body>
		</html>
	)
}
