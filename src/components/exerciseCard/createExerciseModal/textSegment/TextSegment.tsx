import styles from "./textSegment.module.css"

export type Segment = {
	id: string
	text: string
	translation: string
	hover: boolean
}

type Props = {
	index: number
	segment: Segment
	onChange: (id: string, value: string) => void
	onNext: () => void
}

export default function TextSegment({ index, segment, onChange, onNext }: Props) {
	return (
		<li className={styles.segment}>
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
		</li>
	)
}
