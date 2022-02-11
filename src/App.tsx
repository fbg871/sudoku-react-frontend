import './App.css'
import Header from './components/Header'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Profile from './components/Profile/Profile'
import PlayPuzzle from './components/Puzzle/PlayPuzzle/PlayPuzzle'
import { Provider } from 'react-redux'
import { store } from './store'

function App() {
	return (
		<>
			<div className="app-backdrop">
				<Provider store={store}>
					<Header />
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Profile />} />
							<Route path="/play" element={<PlayPuzzle />} />
						</Routes>
					</BrowserRouter>
				</Provider>
			</div>
		</>
	)
}

export default App
