"use client"

import { useCreateUnitModalStore } from "@/stores"
import styles from "./createUnitModal.module.css"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateUnitForm, createUnitSchema } from "@/schemas"
import { useEffect } from "react"
import { useParams } from "next/navigation"
import createUnitAction from "@/app/actions/createUnit"

export default function CreateUnitModal() {
	const isOpen = useCreateUnitModalStore((s) => s.isOpen)
	const close = useCreateUnitModalStore((s) => s.close)

	useEffect(() => {
		console.log(isOpen)
	}, [isOpen])

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateUnitForm>({
		resolver: zodResolver(createUnitSchema),
		defaultValues: {
			name: "",
		},
	})

	const { trackId } = useParams<{ trackId: string }>()

	const onSubmit = async (data: CreateUnitForm) => {
		createUnitAction({ name: data.name, trackId })
		close()
	}

	if (!isOpen) return null

	return (
		<div className={styles.backdrop} onClick={close}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<h2 className={styles.title}>Create unit</h2>

				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.inputBlock}>
						<label htmlFor="unitName" className={styles.label}>
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
