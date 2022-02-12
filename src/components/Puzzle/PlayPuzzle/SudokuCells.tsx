import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { removeAllSelected, setLeftClickDown } from '../../../slices/selectionSlice'

import { ClickAwayListener } from '@mui/material'
import useKeyboard from '../../../hooks/useKeyboard'
import useMouse from '../../../hooks/useMouse'

const SudokuCells = () => {
	const grid = useSelector((state: RootState) => state.selection)
	const puzzle = useSelector((state: RootState) => state.puzzle)

	const dispatch = useDispatch()

	const [open, setOpen] = useState(false)
	const handleClose = () => {
		setOpen(false)
	}

	const handleClickAway = () => {
		dispatch(setLeftClickDown(false))
		dispatch(removeAllSelected())
	}

	useEffect(() => {
		if (!puzzle.progress.values.includes(null)) {
			setOpen(true)
		}
	}, [puzzle.progress.values])

	const { handleMouseDown, handleMouseUp, handleMouseMove, handleScroll } =
		useMouse()

	const handleKeyboard = useKeyboard()

	let elem: JSX.Element[] = []
	for (let i = 0; i < 81; i++) {
		elem.push(
			<rect
				key={i}
				className="sudoku-cell"
				data-rightclick={grid.rightClickDown.includes(i)}
				y={Math.floor(i / 9) * 50}
				x={(i % 9) * 50}
				width="50"
				height="50"
				tabIndex={0}
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

	return (
		<>
			<ClickAwayListener onClickAway={handleClickAway}>
				<g className="cells">{elem}</g>
			</ClickAwayListener>
			{/* <Modal
				onContextMenu={(e) => e.preventDefault()}
				className="victory"
				open={open}
				onClose={handleClose}>
				<PuzzleComplete />
			</Modal> */}
		</>
	)
}

export default SudokuCells
