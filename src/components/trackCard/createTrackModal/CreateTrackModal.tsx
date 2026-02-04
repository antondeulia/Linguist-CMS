"use client"

import { useCreateTrackModalStore } from "@/stores"
import styles from "./createTrackModal.module.css"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateTrackForm, createTrackSchema } from "@/schemas"
import createTrackAction from "@/app/actions/createTrack"
import { useEffect } from "react"
import { useParams } from "next/navigation"

export default function CreateTrackModal() {
	const isOpen = useCreateTrackModalStore((s) => s.isOpen)
	const close = useCreateTrackModalStore((s) => s.close)

	useEffect(() => {
		console.log(isOpen)
	}, [isOpen])

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateTrackForm>({
		resolver: zodResolver(createTrackSchema),
		defaultValues: {
			name: "",
		},
	})

	const { id } = useParams<{ id: string }>()

	const onSubmit = async (data: CreateTrackForm) => {
		createTrackAction({ name: data.name, courseId: id })
		close()
	}

	if (!isOpen) return null

	return (
		<div className={styles.backdrop} onClick={close}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<h2 className={styles.title}>Create track</h2>

				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.inputBlock}>
						<label htmlFor="trackName" className={styles.label}>
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
