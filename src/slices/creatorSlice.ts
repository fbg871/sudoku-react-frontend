import { createSlice } from '@reduxjs/toolkit'
import { solved_flat, sudoku_flat } from '../sudoku_test'

interface CreatorState {
	values: (number | null)[]

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
		addThermo: (state, action) => {
			if (state.thermo === null) {
				state.thermo = [action.payload]
			} else {
				state.thermo.push(action.payload)
			}
		},
		removeThermo: (state, action) => {
			if (state.thermo !== null) {
				state.thermo = state.thermo.filter(
					(thermometer) => thermometer !== action.payload
				)
			}
		},
		addArrow: (state, action) => {
			if (state.arrow === null) {
				state.arrow = [action.payload]
			} else {
				state.arrow.push(action.payload)
			}
		},
		removeArrow: (state, action) => {
			if (state.arrow !== null) {
				state.arrow = state.arrow.filter(
					(thermometer) => thermometer !== action.payload
				)
			}
		},
		addPalindrome: (state, action) => {
			if (state.palindrome === null) {
				state.palindrome = [action.payload]
			} else {
				state.palindrome.push(action.payload)
			}
		},
		removePalindrome: (state, action) => {
			if (state.palindrome !== null) {
				state.palindrome = state.palindrome.filter(
					(thermometer) => thermometer !== action.payload
				)
			}
		},

		toggleDiagonal: (state, action) => {
			state.diagonal = !state.diagonal
		},

		addKropkiHollow: (state, action) => {
			if (state.arrow === null) {
				state.arrow = [action.payload]
			} else {
				state.arrow.push(action.payload)
			}
		},
		removeKropkiHollow: (state, action) => {
			if (state.arrow !== null) {
				state.arrow = state.arrow.filter(
					(thermometer) => thermometer !== action.payload
				)
			}
		},
	},
})

export const { addValueAtIndex, deleteAll } = creatorSlice.actions

export default creatorSlice.reducer
