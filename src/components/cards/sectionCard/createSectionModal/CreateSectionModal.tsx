"use client"

import { useCreateSectionModalStore } from "@/stores"
import styles from "./createSectionModal.module.css"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateSectionForm, createSectionSchema } from "@/schemas"
import { useEffect } from "react"
import { useParams } from "next/navigation"
import createSectionAction from "@/app/actions/createSection"

export default function CreateSectionModal() {
	const isOpen = useCreateSectionModalStore((s) => s.isOpen)
	const close = useCreateSectionModalStore((s) => s.close)

	useEffect(() => {
		console.log(isOpen)
	}, [isOpen])

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateSectionForm>({
		resolver: zodResolver(createSectionSchema),
		defaultValues: {
			name: "",
		},
	})

	const { courseId } = useParams<{ courseId: string }>()

	const onSubmit = async (data: CreateSectionForm) => {
		createSectionAction({ name: data.name, courseId })
		close()
	}

	if (!isOpen) return null

	return (
		<div className={styles.backdrop} onClick={close}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<h2 className={styles.title}>Create section</h2>

				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.inputBlock}>
						<label htmlFor="sectionName" className={styles.label}>
							Name
						</label>
						<input className={styles.input} {...register("name")} />
						{errors.name && (
							<span className={styles.error}>{errors.name.message}</span>
						)}
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
