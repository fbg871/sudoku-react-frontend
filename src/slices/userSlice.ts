import { createSlice } from '@reduxjs/toolkit'

interface UserState {
	email: string | null
	username: string | null
}

export const initialState: UserState = {
	email: null,
	username: null,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.username = action.payload[0]
			state.email = action.payload[1]
		},
		destroyUser: (state) => {
			state = initialState
		},
	},
})

export const { setUser, destroyUser } = userSlice.actions

export default userSlice.reducer
