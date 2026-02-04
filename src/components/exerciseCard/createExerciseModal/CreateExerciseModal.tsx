"use client"

import { useCreateExerciseModalStore } from "@/stores"
import styles from "./createExerciseModal.module.css"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateExerciseForm, createExerciseSchema } from "@/schemas"
import { useEffect, useRef, useState } from "react"
import { useParams } from "next/navigation"
import TextSegment, { Segment } from "./textSegment/TextSegment"
import { CreateExerciseInput } from "@/app/actions"
import createExerciseAction from "@/app/actions/createExercise"

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
		const exerciseToCreate: CreateExerciseInput = {
			name: data.name,
			rawText: data.text,
			direction: data.direction,
			type: "exercise",
			hover: true,
			unitId,
			segments,
		}

		createExerciseAction(exerciseToCreate)
		// close()
	}

	const [segments, setSegments] = useState<Segment[]>([])

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

	function findNextHoverIndex(segments: Segment[], from: number) {
		for (let i = from + 1; i < segments.length; i++) {
			if (segments[i].hover) return i
		}
		return -1
	}

	function mergeWithNext(index: number) {
		setSegments((prev) => {
			if (!prev) return prev

			const nextIndex = findNextHoverIndex(prev, index)
			if (nextIndex === -1) return prev

			const a = prev[index]
			const b = prev[nextIndex]

			const middle = prev
				.slice(index + 1, nextIndex)
				.map((s) => s.text)
				.join("")

			const merged = {
				...a,
				text: a.text + middle + b.text,
				translation: "",
				mergedFrom: {
					ids: [a.id, b.id],
					texts: [a.text, b.text],
				},
			}

			return [...prev.slice(0, index), merged, ...prev.slice(nextIndex + 1)]
		})
	}

	function unmerge(index: number) {
		setSegments((prev) => {
			if (!prev) return prev

			const seg = prev[index]
			if (!seg.mergedFrom) return prev

			const [textA, textB] = seg.mergedFrom.texts

			const restored = [
				{
					id: crypto.randomUUID(),
					text: textA,
					translation: "",
					hover: true,
				},
				{
					id: crypto.randomUUID(),
					text: textB,
					translation: "",
					hover: true,
				},
			]

			return [...prev.slice(0, index), ...restored, ...prev.slice(index + 1)]
		})
	}

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
											onMerge={mergeWithNext}
											onUnmerge={unmerge}
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
