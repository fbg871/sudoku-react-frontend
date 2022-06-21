import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

const Numbers = ({ isFilled }: { isFilled: boolean }) => {
	const prefilled = useSelector((state: RootState) => state.puzzle.puzzle.prefilled)
	const puzzle = useSelector((state: RootState) => state.puzzle)

	let nums: JSX.Element[] = []

	puzzle.progress.values.forEach((val, i) => {
		if (!prefilled.includes(i)) {
			nums.push(
				<text
					key={i}
					className="sudoku-numbers"
					y={Math.floor(i / 9) * 50 + 25}
					x={(i % 9) * 50 + 25}
					width="50"
					height="50">
					{val}
				</text>
			)
		}
	})

	puzzle.puzzle.values.forEach((val, i) => {
		if (val) {
			if (isFilled) {
				nums.push(
					<text
						key={i}
						className="fill"
						y={Math.floor(i / 9) * 50 + 25}
						x={(i % 9) * 50 + 25}
						width="50"
						height="50">
						{val}
					</text>
				)
			} else {
				nums.push(
					<text
						key={i}
						className="nofill"
						y={Math.floor(i / 9) * 50 + 25}
						x={(i % 9) * 50 + 25}
						width="50"
						height="50">
						{val}
					</text>
				)
			}
		}
	})

	return <g className="numbers">{nums}</g>
}

export default Numbers
