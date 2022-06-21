import { Box, Button, Container, IconButton } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import SudokuCells from '../PlayPuzzle/SudokuCells'
import Grid from '../Shared/Grid'
import Highlight from '../Shared/Highlight'
import './creator.css'
import SettingsIcon from '@mui/icons-material/Settings'
import SideBar from './SideBar'
import Variants from '../Shared/Variants/Variants'

const PuzzleCreator = () => {
	const userSettings = useSelector((state: RootState) => state.settings)
	const selection = useSelector((state: RootState) => state.selection)

	const validatePuzzle = () => {
		return true
	}

	// const submitCreation = () => {
	// 	if (validatePuzzle()) {
	// 		axio
	// 	}
	// }

	return (
		<div
			className={'creator-section ' + (selection.multiSelect ? 'multi' : 'single')}>
			<div className="game-grid">
				<Box className="sudoku-board">
					<svg className="sudoku-creator" viewBox="-5 -5 460 460">
						{/* {gamesettings.prefillCell && <Prefill prefilled={sud.preFilled} />} */}

						<Highlight createMode={true} />

						<Grid />
						<Variants createMode={true} />

						{/* <PencilMarks />

					<Numbers isFilled={userSettings.prefillCell} />
					<Selector /> */}
						<SudokuCells createMode={true} />
					</svg>
				</Box>
				<SideBar />
			</div>
			{/* <button onClick={() => submitCreation()}></button> */}
		</div>
	)
}

export default PuzzleCreator
