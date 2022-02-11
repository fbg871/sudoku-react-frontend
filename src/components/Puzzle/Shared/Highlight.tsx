import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

// This component generates <rect>

const Highlight = () => {
	const grid = useSelector((state: RootState) => state.selection)
	// const grid = useSelector((state: RootState) => state.persistedReducer.gridReducer)

	const sud = useSelector((state: RootState) => state.puzzle.progress)

	const highlightRelated = useSelector(
		(state: RootState) => state.settings.highlightRelated
	)

	let selected: JSX.Element[] = []
	let rightclick: JSX.Element[] = []
	let related: JSX.Element[] = []

	grid.selected.forEach((sel, i) => {
		selected.push(
			<rect
				key={i}
				className="highlight"
				y={Math.floor(sel / 9) * 50}
				x={(sel % 9) * 50}
				width="50"
				height="50"
			/>
		)
	})
	grid.rightClickDown.forEach((right, i) => {
		rightclick.push(
			<rect
				key={i + 81}
				className="rightclick"
				y={Math.floor(right / 9) * 50}
				x={(right % 9) * 50}
				width="50"
				height="50"
			/>
		)
	})

	if (highlightRelated) {
		grid.related.forEach((rel, i) => {
			related.push(
				<rect
					key={i + 162}
					className="related"
					y={Math.floor(rel / 9) * 50}
					x={(rel % 9) * 50}
					width="50"
					height="50"
				/>
			)
		})
	}

	return (
		<g className="selection">
			{rightclick}
			{selected}
			{highlightRelated && related}
			{sud.error && (
				<rect
					className="error"
					y={Math.floor(sud.errorIndex / 9) * 50}
					x={(sud.errorIndex % 9) * 50}
					width="50"
					height="50"
				/>
			)}
		</g>
	)
}

export default Highlight
