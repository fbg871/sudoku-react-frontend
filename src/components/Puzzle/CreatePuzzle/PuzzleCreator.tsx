import { Box, Container } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import SudokuCells from '../PlayPuzzle/SudokuCells'
import Grid from '../Shared/Grid'
import Highlight from '../Shared/Highlight'

const PuzzleCreator = () => {
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

					{/* <PencilMarks />

					<Numbers isFilled={userSettings.prefillCell} />
					<Selector /> */}
					<SudokuCells />
				</svg>
			</Box>
		</Container>
	)
}

export default PuzzleCreator
