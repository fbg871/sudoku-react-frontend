import { Box, Container } from '@mui/material'
import Grid from '../Shared/Grid'
import Highlight from '../Shared/Highlight'
import Numbers from '../Shared/Numbers'
import SudokuCells from './SudokuCells'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import Selector from '../Shared/Selector'
import PencilMarks from './PencilMarks'

import '../puzzle.css'
import GameBar from '../../GameBar/GameBar'
import { useEffect, useState } from 'react'
import { convertToPuzzle, convertToProgress } from '../../convertToPuzzleObject'
import { setProgress, setPuzzle } from '../../../slices/puzzleSlice'
import Loading from '../../Loading/Loading'

const PlayPuzzle = () => {
	const [loading, setLoading] = useState(true)
	const [progLoad, setProgLoad] = useState(true)

	const userSettings = useSelector((state: RootState) => state.settings)
	const selection = useSelector((state: RootState) => state.selection)

	const progress = useSelector((state: RootState) => state.puzzle.progress)

	const dispatch = useDispatch()

	const axios = require('axios').default

	useEffect(() => {
		// const result = await axios.get('http://localhost:5000/get_progress/1/1')

		fetch('http://localhost:5000/get_progress/1/1', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((resp) => {
				if (resp.status === 201) {
					console.log('empty')
					setProgLoad(false)
					throw new Error('error state:' + resp.status)
				}
				return resp.json()
			})
			// .then((resp) => console.log(convertToProgress(resp)))
			.then((resp) => convertToProgress(resp))
			.then((resp) => dispatch(setProgress(resp)))
			.then(() => setProgLoad(false))

			.catch((err) => console.log('error ' + err.message))
	}, [])

	useEffect(() => {
		fetch('http://localhost:5000/get_puzzle/1', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((resp) => {
				if (!resp.ok) {
					throw new Error('error state:' + resp.status)
				} else {
					return resp.json()
				}
			})
			.then((resp) => dispatch(setPuzzle(convertToPuzzle(resp))))
			.then(() => setLoading(false))
			.catch((err) => console.log(err))
	}, [])

	useEffect(() => {
		const test = () =>
			fetch('http://localhost:5000/add_progress', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					puzzle_id: 1,
					user_id: 1,
					values: JSON.stringify(progress.values),
					temporaryValues: JSON.stringify(progress.temporaryValues),
					pencilmarks: JSON.stringify(progress.pencilmarks),
					errorIndex: JSON.stringify(progress.errorIndex),
				}),
			})
				.then((resp) => console.log(resp))
				.catch((err) => console.log('error! ' + err.message))
		if (progLoad) {
		} else {
			test()
		}
	}, [progress])

	//Ignore loading for now

	// if (loading) {
	// 	return (
	// 		<Container
	// 			className={'game-section ' + (selection.multiSelect ? 'multi' : 'single')}
	// 			maxWidth="sm">
	// 			<Loading />
	// 		</Container>
	// 	)
	// }

	return (
		<Container
			className={'game-section ' + (selection.multiSelect ? 'multi' : 'single')}
			maxWidth="sm">
			<Box className="sudoku-board">
				<svg className="sudoku-game" viewBox="-5 -5 460 460">
					{/* {gamesettings.prefillCell && <Prefill prefilled={sud.preFilled} />} */}
					<Highlight createMode={false} />

					<Grid />

					<PencilMarks />

					<Numbers isFilled={userSettings.prefillCell} />
					<Selector />
					<SudokuCells createMode={false} />
				</svg>
			</Box>
			<GameBar />
		</Container>
	)
}

export default PlayPuzzle
