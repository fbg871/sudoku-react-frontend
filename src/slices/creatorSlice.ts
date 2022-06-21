import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CreatorState {
	values: (number | null)[]

	thermo: number[][]
	arrow: number[][]
	palindrome: number[][]
	diagonal: boolean
	kropki_hollow: number[][]
	kropki_solid: number[][]

	selected: number[]
	leftClickDown: boolean
	rightClickDown: number[]
}

export const initialState: CreatorState = {
	values: new Array(81).fill(null),

	thermo: [],
	arrow: [],
	palindrome: [],
	diagonal: false,
	kropki_hollow: [],
	kropki_solid: [],

	selected: [],
	leftClickDown: false,
	rightClickDown: [],
}

export const creatorSlice = createSlice({
	name: 'creator',
	initialState,
	reducers: {
		newCreation: (state) => {
			state = initialState
		},
		resumeCreation: (state, action) => {
			state = action.payload
		},
		addToSelected: (state, action: PayloadAction<number>) => {
			state.selected.push(action.payload)
		},
		resetSelected: (state, action: PayloadAction<number[]>) => {
			state.selected = action.payload
			state.rightClickDown = []
		},
		setRightClick: (state, action) => {
			state.rightClickDown.push(action.payload)
		},
		purgeRightClick: (state) => {
			state.rightClickDown = []
		},
		removeAllSelected: (state) => {
			state.selected = []
		},
		setLeftClickDown: (state, action) => {
			state.leftClickDown = action.payload
		},
		addValueAtIndex: (state, action) => {
			state.values[action.payload[0]] = action.payload[1]
		},
		deleteAll: (state, action) => {
			state.values[action.payload] = null
		},
		addThermo: (state, action) => {
			state.thermo.push(action.payload)
		},
		removeThermo: (state, action) => {
			state.thermo = state.thermo.filter(
				(thermometer) => thermometer !== action.payload
			)
		},
		addArrow: (state, action) => {
			state.arrow.push(action.payload)
		},
		removeArrow: (state, action) => {
			state.arrow = state.arrow.filter(
				(thermometer) => thermometer !== action.payload
			)
		},
		addPalindrome: (state, action) => {
			state.palindrome.push(action.payload)
		},
		removePalindrome: (state, action) => {
			state.palindrome = state.palindrome.filter(
				(thermometer) => thermometer !== action.payload
			)
		},

		toggleDiagonal: (state) => {
			state.diagonal = !state.diagonal
		},

		addKropkiHollow: (state, action) => {
			state.arrow.push(action.payload)
		},
		removeKropkiHollow: (state, action) => {
			state.arrow = state.arrow.filter(
				(thermometer) => thermometer !== action.payload
			)
		},
	},
})

export const {
	addToSelected,
	resetSelected,
	setRightClick,
	setLeftClickDown,
	purgeRightClick,
	addValueAtIndex,
	deleteAll,
	addArrow,
	removeArrow,
	addKropkiHollow,
	removeKropkiHollow,
	addPalindrome,
	removePalindrome,
	addThermo,
	removeThermo,
	toggleDiagonal,
} = creatorSlice.actions

export default creatorSlice.reducer
