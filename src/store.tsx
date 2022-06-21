import { configureStore } from '@reduxjs/toolkit'
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import selectionReducer from './slices/selectionSlice'
import puzzleReducer from './slices/puzzleSlice'

import creatorReducer from './slices/creatorSlice'
import settingsReducer from './slices/settingsSlice'
import userReducer from './slices/userSlice'

const persistConfig = {
	key: 'user',
	storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
	reducer: {
		selection: selectionReducer,
		// persistedReducer,
		puzzle: puzzleReducer,
		creator: creatorReducer,
		settings: settingsReducer,
		user: persistedReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
