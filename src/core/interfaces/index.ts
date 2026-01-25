export interface ICourse {
	id: string
	name: string
	sourceLang: string
	targetLang: string
	tracks: ITrack[]
}

export interface ITrack {
	id: string
	name: string
	units: IUnit[]
	_count: {
		units: number
	}
}

export interface IUnit {
	id: string
	name: string
	_count?: {
		exercises: number
	}
	exercises: IExercise[]
}

export interface IExercise {
	id: string
	text: string
	type: string
	sourceLang: string
	targetLang: string
	unitId: string
}
