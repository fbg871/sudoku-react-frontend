import { createSlice } from '@reduxjs/toolkit'

interface SettingsState {
	errorCheck: string
	highlightRelated: boolean
	prefillCell: boolean
	focusMode: boolean
	darkMode: boolean
	border: boolean
	autoRemove: boolean
}

const initialState: SettingsState = {
	errorCheck: 'solution',
	highlightRelated: false,
	prefillCell: false,
	focusMode: false,
	darkMode: true,
	border: true,
	autoRemove: true,
}

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		// fetch settings from database, insert settings object into slice
		setSettings: (state, action) => {
			state = action.payload
		},
		changeErrorCheck: (state, action) => {
			state.errorCheck = action.payload
		},
		toggleHighlightRelated: (state) => {
			state.highlightRelated = !state.highlightRelated
		},
		togglePrefill: (state) => {
			state.prefillCell = !state.prefillCell
		},
		toggleFocusMode: (state) => {
			state.focusMode = !state.focusMode
		},
		toggleDarkMode: (state) => {
			state.darkMode = !state.darkMode
		},
		toggleBorder: (state) => {
			state.border = !state.border
		},
		toggleAutoRemove: (state) => {
			state.autoRemove = !state.autoRemove
		},
	},
})

export const {
	changeErrorCheck,
	toggleHighlightRelated,
	toggleDarkMode,
	toggleFocusMode,
	togglePrefill,
	toggleBorder,
	toggleAutoRemove,
} = settingsSlice.actions

export default settingsSlice.reducer
