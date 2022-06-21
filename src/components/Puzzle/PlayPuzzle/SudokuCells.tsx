import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { removeAllSelected, setLeftClickDown } from '../../../slices/selectionSlice'

import { ClickAwayListener } from '@mui/material'
import useKeyboard from '../../../hooks/useKeyboard'
import useMouse from '../../../hooks/useMouse'
import useCreator from '../../../hooks/useCreator'
import useTouch from '../../../hooks/useTouch'

const SudokuCells = ({ createMode }: { createMode: boolean }) => {
	const grid = useSelector((state: RootState) => state.selection)
	const creator = useSelector((state: RootState) => state.creator)

	const dispatch = useDispatch()

	const handleClickAway = () => {
		dispatch(setLeftClickDown(false))
		dispatch(removeAllSelected())
	}

	const { handleMouseDown, handleMouseUp, handleMouseMove, handleScroll } =
		useMouse()
	const handleKeyboard = useKeyboard()

	const { handleMouseDown2, handleMouseUp2, handleMouseMove2, handleKeyboard2 } =
		useCreator()

	const { handleFingerDown, handleFingerMove, handleFingerUp } = useTouch()

	let elem: JSX.Element[] = []
	if (!createMode) {
		for (let i = 0; i < 81; i++) {
			elem.push(
				<rect
					key={i}
					className="sudoku-cell"
					y={Math.floor(i / 9) * 50}
					x={(i % 9) * 50}
					data-rightclick={grid.rightClickDown.includes(i)}
					data-index={i}
					width="50"
					height="50"
					tabIndex={0}
					onTouchStart={(e) => handleFingerDown(e, i)}
					onTouchMove={(e) => handleFingerMove(e)}
					onTouchEnd={() => handleFingerUp()}
					onMouseDown={(e) => handleMouseDown(e, i)}
					onMouseMove={() => handleMouseMove(i)}
					onMouseUp={(e) => handleMouseUp(e)}
					onKeyDown={(e) => handleKeyboard(e)}
					onContextMenu={(e) => e.preventDefault()}
					onWheel={(e) => handleScroll(e)}
				/>
			)
			if (i % 9 !== 0 && i > 9) {
				elem.push(
					<circle
						key={i + 81}
						className="corner"
						data-activate={grid.leftClickDown}
						onMouseUp={(e) => handleMouseUp(e)}
						cx={(i % 9) * 50}
						cy={Math.floor(i / 9) * 50}
						r="9"
					/>
				)
			}
		}
	} else {
		for (let i = 0; i < 81; i++) {
			elem.push(
				<rect
					key={i}
					className="sudoku-cell"
					y={Math.floor(i / 9) * 50}
					x={(i % 9) * 50}
					data-rightclick={creator.rightClickDown.includes(i)}
					width="50"
					height="50"
					tabIndex={0}
					onMouseDown={(e) => handleMouseDown2(e, i)}
					onMouseMove={() => handleMouseMove2(i)}
					onMouseUp={(e) => handleMouseUp2(e)}
					onKeyDown={(e) => handleKeyboard2(e)}
					onContextMenu={(e) => e.preventDefault()}
					// onWheel={(e) => handleScroll(e)}
				/>
			)
			if (i % 9 !== 0 && i > 9) {
				elem.push(
					<circle
						key={i + 81}
						className="corner"
						data-activate={creator.leftClickDown}
						onMouseUp={(e) => handleMouseUp2(e)}
						cx={(i % 9) * 50}
						cy={Math.floor(i / 9) * 50}
						r="9"
					/>
				)
			}
		}
	}

	return (
		<>
			<ClickAwayListener onClickAway={handleClickAway}>
				<g className="cells">{elem}</g>
			</ClickAwayListener>
		</>
	)
}

export default SudokuCells
