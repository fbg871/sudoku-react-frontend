import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { getPencilCoordinates } from '../getPencilCoordinates'

const PencilMarks = () => {
	const pencilmarks = useSelector(
		(state: RootState) => state.puzzle.progress.pencilmarks
	)

	// let elem: JSX.Element[] = []

	// pencilmarks.map((pencils, index) => {
	// 	pencils.map((pen) => {
	// 		elem.push(
	// 			<text
	// 					key={index + ' ' + pen}
	// 					className="sudoku-pencilmarks"
	// 					x={getPencilCoordinates(pen, index)[0]}
	// 					y={getPencilCoordinates(pen, index)[1]}
	// 					width="15"
	// 					height="15">
	// 					{pen}
	// 			</text>
	// 		)
	// 	})
	// }

	return (
		<g className="pencilmarks">
			{pencilmarks.map((pencils, index) => {
				return pencils.map((pen) => (
					<text
						key={index + ' ' + pen}
						className="sudoku-pencilmarks"
						x={getPencilCoordinates(pen, index)[0]}
						y={getPencilCoordinates(pen, index)[1]}
						width="15"
						height="15">
						{pen}
					</text>
				))
			})}
		</g>
	)
}

export default PencilMarks
