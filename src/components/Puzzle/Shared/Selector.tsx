import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { getPencilCoordinates } from '../getPencilCoordinates'

const Selector = () => {
	// const temporaryNumbers = useSelector(
	// 	(state: RootState) => state.sudoku.temporaryValues
	// )

	const temporaryNumbers = useSelector(
		(state: RootState) => state.puzzle.progress.temporaryValues
	)

	// const values = useSelector((state: RootState) => state.sudoku.values)
	const values = useSelector((state: RootState) => state.puzzle.progress.values)

	// const pencilmarks = useSelector((state: RootState) => state.sudoku.pencilmarks)
	const pencilmarks = useSelector(
		(state: RootState) => state.puzzle.progress.pencilmarks
	)
	const preFilled = useSelector((state: RootState) => state.puzzle.puzzle.prefilled)

	const grid = useSelector((state: RootState) => state.selection)
	// const grid = useSelector((state: RootState) => state.persistedReducer.gridReducer)

	let tempVal: JSX.Element[] = []
	let tempPenc: JSX.Element[] = []

	if (
		grid.rightClickDown.length === 1 &&
		pencilmarks[grid.rightClickDown[0]].length == 0
	) {
		temporaryNumbers.forEach((temp, index) => {
			if (grid.rightClickDown.includes(index) && !preFilled.includes(index)) {
				tempVal.push(
					<text
						key={index}
						className="mouse-selector"
						y={Math.floor(index / 9) * 50 + 25}
						x={(index % 9) * 50 + 25}
						width="50"
						height="50">
						{temp}
					</text>
				)
			}
		})
	} else if (grid.rightClickDown.length === 1) {
		temporaryNumbers.forEach((temp, index) => {
			if (
				grid.rightClickDown.includes(index) &&
				!preFilled.includes(index) &&
				temp !== null &&
				values[index] === null &&
				pencilmarks[index].includes(temp)
			) {
				tempPenc.push(
					<text
						key={index}
						className="cancel"
						x={getPencilCoordinates(temp, index)[0]}
						y={getPencilCoordinates(temp, index)[1]}
						width="15"
						height="15">
						/
					</text>
				)
			} else if (
				grid.rightClickDown.includes(index) &&
				!preFilled.includes(index) &&
				values[index] === null &&
				temp !== null
			) {
				tempPenc.push(
					<text
						key={index}
						className="pencil-selector"
						x={getPencilCoordinates(temp, index)[0]}
						y={getPencilCoordinates(temp, index)[1]}
						width="15"
						height="15">
						{temp}
					</text>
				)
			}
		})
	} else if (grid.rightClickDown.length > 1) {
		temporaryNumbers.forEach((temp, index) => {
			if (
				grid.rightClickDown.includes(index) &&
				!preFilled.includes(index) &&
				temp !== null &&
				values[index] === null &&
				pencilmarks[index].includes(temp)
			) {
				tempPenc.push(
					<text
						key={index}
						className="cancel"
						x={getPencilCoordinates(temp, index)[0]}
						y={getPencilCoordinates(temp, index)[1]}
						width="15"
						height="15">
						/
					</text>
				)
			} else if (
				grid.rightClickDown.includes(index) &&
				!preFilled.includes(index) &&
				values[index] === null &&
				temp !== null
			) {
				tempPenc.push(
					<text
						key={index}
						className="pencil-selector"
						x={getPencilCoordinates(temp, index)[0]}
						y={getPencilCoordinates(temp, index)[1]}
						width="15"
						height="15">
						{temp}
					</text>
				)
			}
		})
	}

	return (
		<g className="numberSelector">
			{tempVal}
			{tempPenc}
		</g>
	)
}

export default Selector
