import { Box, Container } from '@mui/material'
import './home.css'
import Loading from './Loading/Loading'
import PuzzleMenu from './Puzzle/PuzzleMenu'

const Home = () => {
	return (
		<Container className="game-section" maxWidth="sm">
			<PuzzleMenu />
			{/* <Loading /> */}
		</Container>
	)
}

export default Home
