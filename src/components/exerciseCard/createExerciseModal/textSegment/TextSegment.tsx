import styles from "./textSegment.module.css"

export type Segment = {
	id: string
	text: string
	translation: string
	hover: boolean
	mergedFrom?: {
		ids: string[]
		texts: string[]
	}
}

type Props = {
	index: number
	segment: Segment
	onChange: (id: string, value: string) => void
	onNext: () => void
	onMerge: (index: number) => void
	onUnmerge: (index: number) => void
}

export default function TextSegment({
	index,
	segment,
	onChange,
	onNext,
	onMerge,
	onUnmerge,
}: Props) {
	return (
		<li className={styles.wrapper}>
			<div className={styles.segment}>
				<p className={styles.text}>{segment.text}</p>

				<input
					type="text"
					value={segment.translation}
					placeholder="Translation"
					className={styles.input}
					onChange={(e) => onChange(segment.id, e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter" && segment.translation.trim()) {
							e.preventDefault()
							onNext()
						}
					}}
				/>
			</div>

			<div className={styles.buttons}>
				<button
					className={styles.btn}
					type="button"
					onClick={() => onUnmerge(index)}
				>
					-
				</button>
				<button
					className={styles.btn}
					type="button"
					onClick={() => onMerge(index)}
				>
					+
				</button>
			</div>
		</li>
	)
}
