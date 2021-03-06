import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SelectionState {
	selected: number[]
	leftClickDown: boolean
	rightClickDown: number[]
	related: number[]
	multiSelect: boolean
}

const initialState: SelectionState = {
	selected: [],
	leftClickDown: false,
	rightClickDown: [],
	related: [],
	multiSelect: false,
}

export const selectionSlice = createSlice({
	name: 'selection',
	initialState,
	reducers: {
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
		addToRelated: (state, action) => {
			state.related.push(action.payload)
		},
		purgeRelated: (state) => {
			state.related = []
		},
		setLeftClickDown: (state, action) => {
			state.leftClickDown = action.payload
		},
		toggleMultiSelect: (state) => {
			state.multiSelect = !state.multiSelect
		},
	},
})

export const {
	addToSelected,
	resetSelected,
	setRightClick,
	purgeRightClick,
	removeAllSelected,
	addToRelated,
	purgeRelated,
	setLeftClickDown,
	toggleMultiSelect,
} = selectionSlice.actions

export default selectionSlice.reducer
