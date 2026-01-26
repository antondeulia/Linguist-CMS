"use client"

import { useCreateCourseModalStore } from "@/stores/createCourseModalStore"
import styles from "./createCourseModal.module.css"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateCourseForm, createCourseSchema } from "@/schemas/createCourseSchema"
import createCourseAction from "@/app/actions/courses/createCourse"

export default function CreateCourseModal() {
	const isOpen = useCreateCourseModalStore((s) => s.isOpen)
	const close = useCreateCourseModalStore((s) => s.close)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateCourseForm>({
		resolver: zodResolver(createCourseSchema),
		defaultValues: {
			name: "",
			sourceLang: "",
			targetLang: "",
		},
	})

	const onSubmit = async (data: CreateCourseForm) => {
		createCourseAction(data)
		close()
	}

	if (!isOpen) return null

	return (
		<div className={styles.backdrop} onClick={close}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<h2 className={styles.title}>Create course</h2>

				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.inputBlock}>
						<label htmlFor="courseName" className={styles.label}>
							Name
						</label>
						<input className={styles.input} {...register("name")} />
						{errors.name && (
							<span className={styles.error}>{errors.name.message}</span>
						)}
					</div>

					<div className={styles.inputGroup}>
						<div className={styles.inputBlock}>
							<label htmlFor="sourceLang" className={styles.label}>
								From
							</label>
							<select {...register("sourceLang")} className={styles.input}>
								<option value="">Select</option>
								<option value="en">English</option>
								<option value="ru">Russian</option>
								<option value="le">Litvanian</option>
								<option value="se">Swedish</option>
								<option value="de">German</option>
								<option value="ke">Kambodga</option>
							</select>
						</div>

						<div className={styles.arrow}>→</div>

						<div className={styles.inputBlock}>
							<label htmlFor="targetLang" className={styles.label}>
								To
							</label>
							<select {...register("targetLang")} className={styles.input}>
								<option value="">Select</option>
								<option value="en">English</option>
								<option value="ru">Russian</option>
								<option value="se">Swedish</option>
								<option value="de">German</option>
								<option value="le">Litvanian</option>
								<option value="ke">Kambodga</option>
							</select>
							{errors.targetLang && (
								<span className={styles.error}>
									{errors.targetLang.message}
								</span>
							)}
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
