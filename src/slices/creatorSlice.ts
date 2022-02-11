import { createSlice } from '@reduxjs/toolkit'
import { solved_flat, sudoku_flat } from '../sudoku_test'

interface CreatorState {
	values: (number | null)[]
	creator: string
	difficulty: number
	isVariant: boolean

	thermo: number[][] | null
	arrow: number[][] | null
	palindrome: number[][] | null
	diagonal: boolean
	kropki_hollow: number[][] | null
	kropki_solid: number[][] | null
}

export const initialState: CreatorState = {
	values: [
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
	],
	creator: '',
	difficulty: 0,

	isVariant: false,
	thermo: null,
	arrow: null,
	palindrome: null,
	diagonal: false,
	kropki_hollow: null,
	kropki_solid: null,
}

export const creatorSlice = createSlice({
	name: 'creator',
	initialState,
	reducers: {
		addValueAtIndex: (state, action) => {
			state.values[action.payload[0]] = action.payload[1]
		},
		deleteAll: (state, action) => {
			state.values[action.payload] = null
		},
	},
})

export const { addValueAtIndex, deleteAll } = creatorSlice.actions

export default creatorSlice.reducer
