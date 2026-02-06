"use client"

import Link from "next/link"
import styles from "./sidebar.module.css"
import { usePathname, useSelectedLayoutSegment } from "next/navigation"

type SidebarItem = {
	name: string
	href: string
}

const items: SidebarItem[] = [
	{ name: "Dashboard", href: "/dashboard" },
	{ name: "Courses", href: "/courses" },
	{ name: "Exams", href: "/exams" },
	{ name: "Users", href: "/users" },
]

export default function Sidebar() {
	const pathname = usePathname()

	return (
		<aside className={styles.sidebar}>
			<Link href="/" className={styles.title}>
				Linguist CMS
			</Link>
			<p className={styles.email}>anton.deulia06@gmail.com</p>

			<ul className={styles.items}>
				{items.map((item, i: number) => {
					const isRoot = item.href === "/"

					const isActive = isRoot
						? pathname === "/"
						: pathname === item.href || pathname.startsWith(item.href + "/")

					return (
						<li
							key={i}
							className={`${styles.item} ${isActive && styles.active}`}
						>
							<Link href={item.href} className={styles.link}>
								{item.name}
							</Link>
						</li>
					)
				})}
			</ul>

			<p className={styles.logout}>Logout</p>
		</aside>
	)
}
