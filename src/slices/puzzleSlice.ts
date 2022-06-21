import { createSlice } from '@reduxjs/toolkit'
import { solved_flat, sudoku_flat } from '../sudoku_test'

export interface PurePuzzle {
	values: (number | null)[]
	solution: number[]
	created_at: string
	user_id: string
	prefilled: number[]
	thermo: number[][]
	arrow: number[][]
	palindrome: number[][]
	diagonal: boolean
	kropki: number[]
}

export interface PuzzleState {
	puzzle: {
		values: (number | null)[]
		solution: number[]
		user_id: string
		created_at: string
		prefilled: number[]
		thermo: number[][]
		arrow: number[][]
		palindrome: number[][]
		diagonal: boolean
		kropki: number[][]
	}
	progress: {
		values: (number | null)[]
		errorIndex: number
		temporaryValues: (number | null)[]
		pencilmarks: number[][]
	}
}

export const createPref = () => {
	let arr: number[] = []
	for (let i = 0; i < 81; i++) {
		if (sudoku_flat[i] !== null) {
			arr.push(i)
		}
	}
	return arr
}

export const initialState: PuzzleState = {
	puzzle: {
		values: sudoku_flat,
		solution: [],
		user_id: 'Q5EfUnV9w8SXshKQBs8NeZO8Sd72',
		created_at: 'none',
		prefilled: [],
		thermo: [],
		arrow: [],
		palindrome: [],
		diagonal: false,
		kropki: [],
	},
	progress: {
		values: new Array(81).fill(null),
		errorIndex: -1,
		temporaryValues: new Array(81).fill(null),
		pencilmarks: new Array(81).fill([]),
	},
}

export const puzzleSlice = createSlice({
	name: 'puzzle',
	initialState,
	reducers: {
		setPuzzle: (state, action) => {
			state.puzzle = action.payload
		},
		setProgress: (state, action) => {
			state.progress = action.payload
		},
		addValueAtIndex: (state, action) => {
			state.progress.values[action.payload[0]] = action.payload[1]
			state.progress.pencilmarks[action.payload[0]] = []
		},
		deleteAll: (state, action) => {
			state.progress.values[action.payload] = null
			state.progress.pencilmarks[action.payload] = []
		},
		addPencilMarks: (state, action) => {
			state.progress.pencilmarks[action.payload[0]] = action.payload[1]
			state.progress.values[action.payload[0]] = null
		},
		appendToPencilMarks: (state, action) => {
			state.progress.pencilmarks[action.payload[0]].push(action.payload[1])
		},
		removeFromPencilMarks: (state, action) => {
			state.progress.pencilmarks[action.payload[0]] = state.progress.pencilmarks[
				action.payload[0]
			].filter((pen) => pen !== action.payload[1])
		},
		addTemporary: (state, action) => {
			state.progress.temporaryValues[action.payload[0]] = action.payload[1]
		},
		deleteTemporary: (state, action) => {
			state.progress.temporaryValues[action.payload] = null
		},
		incrementTemporary: (state, action) => {
			state.progress.temporaryValues[action.payload] =
				state.progress.temporaryValues[action.payload]! + 1
		},
		decrementTemporary: (state, action) => {
			state.progress.temporaryValues[action.payload] =
				state.progress.temporaryValues[action.payload]! - 1
		},
		swapTemporaryWithValue: (state, action) => {
			state.progress.values[action.payload] =
				state.progress.temporaryValues[action.payload]
			state.progress.temporaryValues[action.payload] = null
		},
		swapValueWithTemporary: (state, action) => {
			state.progress.temporaryValues[action.payload] =
				state.progress.values[action.payload]
			state.progress.values[action.payload] = null
		},
		addTemporaryToPencil: (state, action) => {
			state.progress.pencilmarks[action.payload].push(
				state.progress.temporaryValues[action.payload]!
			)
			state.progress.temporaryValues[action.payload] = null
		},
		removeTemporaryFromPencil: (state, action) => {
			state.progress.pencilmarks[action.payload] = state.progress.pencilmarks[
				action.payload
			].filter((pen) => pen !== state.progress.temporaryValues[action.payload])
			state.progress.temporaryValues[action.payload] = null
		},
		setError: (state, action) => {
			state.progress.errorIndex = action.payload
		},
		reverseError: (state) => {
			state.progress.errorIndex = -1
		},
	},
})

export const {
	setPuzzle,
	setProgress,
	addValueAtIndex,
	deleteAll,
	addPencilMarks,
	appendToPencilMarks,
	removeFromPencilMarks,
	addTemporary,
	deleteTemporary,
	incrementTemporary,
	decrementTemporary,
	swapTemporaryWithValue,
	addTemporaryToPencil,
	removeTemporaryFromPencil,
	swapValueWithTemporary,
	setError,
	reverseError,
} = puzzleSlice.actions

export default puzzleSlice.reducer
