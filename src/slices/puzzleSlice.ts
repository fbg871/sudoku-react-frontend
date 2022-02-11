import { createSlice } from '@reduxjs/toolkit'
import { solved_flat, sudoku_flat } from '../sudoku_test'

interface PuzzleState {
	puzzle: {
		values: (number | null)[]
		solution: number[]
		uid: string
		difficulty: number
		likes: number
		prefilled: number[]
	}
	progress: {
		values: (number | null)[]
		error: boolean
		errorIndex: number
		temporaryValues: (number | null)[]
		pencilmarks: number[][]
	}
}

const createPref = () => {
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
		solution: solved_flat,
		uid: 'Q5EfUnV9w8SXshKQBs8NeZO8Sd72',
		difficulty: 7,
		likes: 0,
		prefilled: createPref(),
	},
	progress: {
		values: sudoku_flat,
		error: false,
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
			state.progress.error = true
			state.progress.errorIndex = action.payload
		},
		reverseError: (state) => {
			state.progress.error = false
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
