import { Box, Container } from '@mui/material'
import './home.css'

const Home = () => {
	return (
		<Container className="game-section" maxWidth="sm">
			<Box className="menu-board">
				<button>Play Sudoku</button>
			</Box>
		</Container>
	)
}

export default Home
