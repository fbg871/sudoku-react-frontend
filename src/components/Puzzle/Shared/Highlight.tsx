import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

// This component generates <rect>

const Highlight = ({ createMode }: { createMode: boolean }) => {
	const grid = useSelector((state: RootState) => {
		if (createMode) {
			return state.creator
		} else {
			return state.selection
		}
	})

	const errorIndex = useSelector((state: RootState) => {
		if (!createMode) {
			return state.puzzle.progress.errorIndex
		}
		return null
	})

	const highlightRelated = useSelector(
		(state: RootState) => state.settings.highlightRelated
	)

	const relatedArray = useSelector((state: RootState) => {
		if (!createMode) {
			return state.selection.related
		} else {
			return null
		}
	})

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

	if (highlightRelated && !createMode) {
		relatedArray!.forEach((rel, i) => {
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
			{!createMode && highlightRelated && related}
			{errorIndex && errorIndex !== -1 && (
				<rect
					className="error"
					y={Math.floor(errorIndex / 9) * 50}
					x={(errorIndex % 9) * 50}
					width="50"
					height="50"
				/>
			)}
		</g>
	)
}

export default Highlight
