import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import {
	addToRelated,
	addToSelected,
	purgeRelated,
	resetSelected,
	setRightClick,
	setLeftClickDown,
	purgeRightClick,
} from '../slices/selectionSlice'
import {
	addTemporary,
	addTemporaryToPencil,
	decrementTemporary,
	deleteAll,
	deleteTemporary,
	incrementTemporary,
	removeTemporaryFromPencil,
	swapTemporaryWithValue,
	swapValueWithTemporary,
} from '../slices/puzzleSlice'
import { MouseEvent, WheelEvent } from 'react'

const useMouse = () => {
	const prefilled = useSelector((state: RootState) => state.puzzle.puzzle.prefilled)

	const grid = useSelector((state: RootState) => state.selection)
	const puzzle = useSelector((state: RootState) => state.puzzle)

	const dispatch = useDispatch()

	const handleScroll = (event: WheelEvent<SVGRectElement>) => {
		for (let i = 0; i < grid.rightClickDown.length; i++) {
			if (puzzle.progress.values[grid.rightClickDown[i]] === null) {
				if (event.deltaY < 0) {
					if (puzzle.progress.temporaryValues[grid.rightClickDown[i]] === null) {
						dispatch(addTemporary([grid.rightClickDown[i], 1]))
					} else if (puzzle.progress.temporaryValues[grid.rightClickDown[i]] === 9) {
						dispatch(deleteTemporary(grid.rightClickDown[i]))
					} else {
						dispatch(incrementTemporary(grid.rightClickDown[i]))
					}
				} else {
					if (puzzle.progress.temporaryValues[grid.rightClickDown[i]] === null) {
						dispatch(addTemporary([grid.rightClickDown[i], 9]))
					} else if (puzzle.progress.temporaryValues[grid.rightClickDown[i]] === 1) {
						dispatch(deleteTemporary(grid.rightClickDown[i]))
					} else {
						dispatch(decrementTemporary(grid.rightClickDown[i]))
					}
				}
			}
		}
	}
	const handleMouseDown = (event: MouseEvent<SVGRectElement>, index: number) => {
		switch (event.button) {
			// Left click
			case 0:
				console.log(index)
				dispatch(purgeRelated())
				if (event.shiftKey || event.ctrlKey) {
					if (!grid.selected.includes(index)) {
						dispatch(addToSelected(index))
					}
					dispatch(setLeftClickDown(true))
				} else {
					dispatch(resetSelected([index]))
					if (puzzle.progress.values[index] !== null) {
						for (let i = 0; i < puzzle.progress.values.length; i++) {
							if (
								index !== i &&
								puzzle.progress.values[index] === puzzle.progress.values[i] &&
								!grid.related.includes(i)
							) {
								dispatch(addToRelated(i))
							}
						}
					} else {
						dispatch(purgeRelated())
					}

					dispatch(setLeftClickDown(true))
				}
				break
			// Middle click
			case 1:
				for (let i = 0; i < grid.selected.length; i++) {
					if (!prefilled.includes(grid.selected[i])) {
						dispatch(deleteAll(grid.selected[i]))
					}
				}
				break
			// Right click
			case 2:
				event.preventDefault()
				for (let i = 0; i < grid.selected.length; i++) {
					if (!prefilled.includes(grid.selected[i])) {
						dispatch(setRightClick(grid.selected[i]))
						if (
							puzzle.progress.values[grid.selected[i]] !== null &&
							grid.selected.length === 1
						) {
							dispatch(swapValueWithTemporary(grid.selected[i]))
						}
					}
				}
				break
		}
	}
	const handleMouseMove = (index: number) => {
		if (grid.leftClickDown && !grid.selected.includes(index)) {
			dispatch(addToSelected(index))
			dispatch(purgeRelated())
		}
	}
	const handleMouseUp = (
		event: MouseEvent<SVGRectElement> | MouseEvent<SVGCircleElement>
	) => {
		switch (event.button) {
			// Left click released
			case 0:
				dispatch(setLeftClickDown(false))
				break
			// Right click released
			case 2:
				event.preventDefault()
				if (grid.rightClickDown.length === 1) {
					dispatch(swapTemporaryWithValue(grid.rightClickDown[0]))
				} else if (grid.rightClickDown.length > 1) {
					for (let i = 0; i < grid.rightClickDown.length; i++) {
						if (puzzle.progress.temporaryValues[grid.rightClickDown[i]] !== null) {
							if (
								!puzzle.progress.pencilmarks[grid.rightClickDown[i]].includes(
									puzzle.progress.temporaryValues[grid.rightClickDown[i]]!
								)
							) {
								dispatch(addTemporaryToPencil(grid.rightClickDown[i]))
							} else {
								dispatch(removeTemporaryFromPencil(grid.rightClickDown[i]))
							}
						}
					}
				}
				dispatch(purgeRightClick())
				break
		}
	}
	return { handleMouseDown, handleMouseUp, handleMouseMove, handleScroll }
}

export default useMouse
