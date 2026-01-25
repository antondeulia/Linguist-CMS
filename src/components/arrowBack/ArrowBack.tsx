import Image from "next/image"
import Link from "next/link"
import styles from "./arrowBack.module.css"

type Props = {
	href: string
	text: string
}

export default function ArrowBack({ href, text }: Props) {
	return (
		<Link href={href} className={styles.link}>
			<Image src="/icons/left-arrow.png" alt="left-arrow" width={18} height={18} />
			<span>{text}</span>
		</Link>
	)
}
