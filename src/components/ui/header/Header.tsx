import styles from "./header.module.css"

export default function Header() {
	return (
		<header className={styles.header}>
			<p className={styles.theme}>Theme</p>
			<p className={styles.email}>anton.deulia06@gmail.com</p>
		</header>
	)
}
