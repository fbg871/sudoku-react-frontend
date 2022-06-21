import './App.css'
import Header from './components/Header'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Profile from './components/Profile/Profile'
import PlayPuzzle from './components/Puzzle/PlayPuzzle/PlayPuzzle'
import { Provider } from 'react-redux'
import { store } from './store'
import Home from './components/Home'
import PuzzleCreator from './components/Puzzle/CreatePuzzle/PuzzleCreator'
import Settings from './components/Settings/Settings'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'

function App() {
	return (
		<>
			<div className="app-backdrop">
				<Provider store={store}>
					<BrowserRouter>
						<Header />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/play" element={<PlayPuzzle />} />
							<Route path="/create" element={<PuzzleCreator />} />
							<Route path="/profile" element={<Profile />} />
							<Route path="/settings" element={<Settings />} />
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Signup />} />
						</Routes>
					</BrowserRouter>
				</Provider>
			</div>
		</>
	)
}

export default App
