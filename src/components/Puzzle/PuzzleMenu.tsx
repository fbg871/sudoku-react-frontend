import { Box } from '@mui/material'
import { generateNew } from '../../helpers/generateNew'

const PuzzleMenu = () => {
	return (
		<Box className="menu-board">
			<button className="menu-button" onClick={() => generateNew()}>
				Start new puzzle
			</button>
			<button className="menu-button">Continue</button>
			<button className="menu-button">Browse puzzles</button>
			<button className="menu-button">Create puzzle</button>
		</Box>
	)
}

export default PuzzleMenu
