"use client"

import { useCreateCourseModalStore } from "@/stores/createCourseModalStore"
import styles from "./createCourseModal.module.css"
import { useState } from "react"

export default function CreateCourseModal() {
	const [name, setName] = useState<string>("")
	const [from, setFrom] = useState<string>("")
	const [to, setTo] = useState<string>("")

	const isOpen = useCreateCourseModalStore((s) => s.isOpen)
	const close = useCreateCourseModalStore((s) => s.close)

	if (!isOpen) return null

	return (
		<div className={styles.backdrop} onClick={close}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<h2 className={styles.title}>Create course</h2>

				<form className={styles.form}>
					<div className={styles.inputBlock}>
						<label htmlFor="courseName" className={styles.label}>
							Name
						</label>
						<input
							type="text"
							id="courseName"
							className={styles.input}
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>

					<div className={styles.inputGroup}>
						<div className={styles.inputBlock}>
							<label htmlFor="sourceLang" className={styles.label}>
								From
							</label>
							<select id="sourceLang" className={styles.input}>
								<option value="en">English</option>
								<option value="ru">Russian</option>
							</select>
						</div>

						<div className={styles.arrow}>→</div>

						<div className={styles.inputBlock}>
							<label htmlFor="targetLang" className={styles.label}>
								To
							</label>
							<select id="targetLang" className={styles.input}>
								<option value="en">English</option>
								<option value="ru">Russian</option>
							</select>
						</div>
					</div>

					<div className={styles.buttons}>
						<button type="button" className={styles.btn}>
							Discard
						</button>
						<button type="submit" className={styles.btn}>
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
