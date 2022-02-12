import { Box, Container } from '@mui/material'
import Grid from '../Shared/Grid'
import Highlight from '../Shared/Highlight'
import Numbers from '../Shared/Numbers'
import SudokuCells from './SudokuCells'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import Selector from '../Shared/Selector'
import PencilMarks from './PencilMarks'

import '../puzzle.css'
import GameBar from '../../GameBar/GameBar'

const PlayPuzzle = () => {
	const userSettings = useSelector((state: RootState) => state.settings)
	const selection = useSelector((state: RootState) => state.selection)

	return (
		<Container
			className={'game-section ' + (selection.multiSelect ? 'multi' : 'single')}
			maxWidth="sm">
			<Box className="sudoku-board">
				<svg className="sudoku-game" viewBox="-5 -5 460 460">
					{/* {gamesettings.prefillCell && <Prefill prefilled={sud.preFilled} />} */}
					<Highlight />

					<Grid />

					<PencilMarks />

					<Numbers isFilled={userSettings.prefillCell} />
					<Selector />
					<SudokuCells />
				</svg>
			</Box>
			<GameBar />
		</Container>
	)
}

export default PlayPuzzle
