import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

const bordered = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const borderless = [1, 2, 3, 4, 5, 6, 7, 8]

const Grid = () => {
	const gamesettings = useSelector((state: RootState) => state.settings)

	let lines = []

	if (gamesettings.border) {
		lines = bordered
	} else {
		lines = borderless
	}

	var gridElements: JSX.Element[] = []
	lines.forEach((num) => {
		gridElements.push(
			<line
				key={num}
				fill="none"
				className="gridline gridline-horizontal"
				x1="0"
				y1={num * 50}
				x2="450"
				y2={num * 50}
				strokeWidth="1"
				data-row={num + 1}
			/>,
			<line
				key={num + 10}
				fill="none"
				className="gridline gridline-vertical"
				x1={num * 50}
				y1="0"
				x2={num * 50}
				y2="450"
				strokeWidth="1"
				data-column={num + 1}
			/>
		)
	})

	return <g className="grid">{gridElements}</g>
}

export default Grid
