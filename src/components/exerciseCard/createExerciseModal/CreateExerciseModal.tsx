"use client"

import { useCreateExerciseModalStore } from "@/stores"
import styles from "./createExerciseModal.module.css"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateExerciseForm, createExerciseSchema } from "@/schemas"
import { useEffect, useRef, useState } from "react"
import { useParams } from "next/navigation"
import TextSegment from "./textSegment/TextSegment"

export default function CreateExerciseModal() {
	const isOpen = useCreateExerciseModalStore((s) => s.isOpen)
	const close = useCreateExerciseModalStore((s) => s.close)

	useEffect(() => {
		console.log(isOpen)
	}, [isOpen])

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<CreateExerciseForm>({
		resolver: zodResolver(createExerciseSchema),
		defaultValues: {
			name: "",
			text: "",
		},
	})

	const { unitId } = useParams<{ unitId: string }>()

	const onSubmit = async (data: CreateExerciseForm) => {
		console.log(data)
		console.log(segments)
		// createExerciseAction({ name: data.name, unitId })
		close()
	}

	const [segments, setSegments] = useState<
		| {
				id: string
				text: string
				translation: string
				hover: boolean
		  }[]
		| null
	>(null)

	function splitTextToSegments() {
		const text = getValues("text")

		const parts = text.match(/\w+|[^\w\s]+|\s+/g) || []

		const segments = parts.map((part) => ({
			id: crypto.randomUUID(),
			text: part,
			translation: "",
			hover: /\w/.test(part),
		}))

		setSegments(segments)
	}

	const updateSegment = (id: string, translation: string) => {
		setSegments(
			(prev) => prev?.map((s) => (s.id === id ? { ...s, translation } : s)) ?? null,
		)
	}

	const inputsRef = useRef<HTMLInputElement[]>([])

	if (!isOpen) return null

	return (
		<div className={styles.backdrop} onClick={close}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<h2 className={styles.title}>Create exercise</h2>

				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.inputBlock}>
						<label htmlFor="exerciseName" className={styles.label}>
							Name
						</label>
						<input className={styles.input} {...register("name")} />
						{errors.name && (
							<span className={styles.error}>{errors.name.message}</span>
						)}
					</div>

					<div className={styles.inputBlock}>
						<label htmlFor="exerciseText" className={styles.label}>
							Text
						</label>
						<input className={styles.input} {...register("text")} />
						{errors.text && (
							<span className={styles.error}>{errors.text.message}</span>
						)}
						<button
							onClick={splitTextToSegments}
							type="button"
							className={styles.btn}
						>
							Split
						</button>

						{segments && (
							<ul className={styles.segments}>
								{segments.map((s, i) => {
									if (!s.hover) return null

									return (
										<TextSegment
											key={s.id}
											index={i}
											segment={s}
											onChange={updateSegment}
											onNext={() =>
												inputsRef.current[i + 1]?.focus()
											}
										/>
									)
								})}
							</ul>
						)}
					</div>

					<div className={styles.inputBlock}>
						<label htmlFor="sourceLang" className={styles.label}>
							Direction
						</label>
						<select {...register("direction")} className={styles.input}>
							<option value="fromSourceToTarget">Source to target</option>
							<option value="fromTargetToSource">Target to source</option>
						</select>
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
