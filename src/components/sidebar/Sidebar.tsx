import Link from "next/link"
import styles from "./sidebar.module.css"

type SidebarItem = {
	name: string
	href: string
}

const items: SidebarItem[] = [
	{ name: "Courses", href: "/courses" },
	{ name: "Exams", href: "/exams" },
]

export default function Sidebar() {
	return (
		<aside className={styles.sidebar}>
			<Link href="/" className={styles.title}>
				Linguist CMS
			</Link>

			<ul className={styles.items}>
				{items.map((item, i: number) => (
					<li key={i} className={styles.item}>
						<Link href={item.href} className={styles.link}>
							{item.name}
						</Link>
					</li>
				))}
			</ul>
		</aside>
	)
}
