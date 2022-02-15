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
	toggleMultiSelect,
} from '../slices/selectionSlice'
import {
	addTemporary,
	addTemporaryToPencil,
	decrementTemporary,
	deleteAll,
	deleteTemporary,
	incrementTemporary,
	removeFromPencilMarks,
	removeTemporaryFromPencil,
	swapTemporaryWithValue,
	swapValueWithTemporary,
} from '../slices/puzzleSlice'
import { MouseEvent, useState, WheelEvent } from 'react'
import { getBlock, getCol, getRow } from '../helpers/conflicting'

const useMouse = () => {
	// From settings slice
	const autoRemove = useSelector((state: RootState) => state.settings)
	// From selection slice
	const selected = useSelector((state: RootState) => state.selection.selected)
	const related = useSelector((state: RootState) => state.selection.related)
	const rightClickDown = useSelector(
		(state: RootState) => state.selection.rightClickDown
	)
	const leftClickDown = useSelector(
		(state: RootState) => state.selection.leftClickDown
	)
	const multiSelect = useSelector((state: RootState) => state.selection.multiSelect)

	// From puzzle slice
	const prefilled = useSelector((state: RootState) => state.puzzle.puzzle.prefilled)
	// From progress slice
	const values = useSelector((state: RootState) => state.puzzle.progress.values)
	const pencilmarks = useSelector(
		(state: RootState) => state.puzzle.progress.pencilmarks
	)
	const errorIndex = useSelector(
		(state: RootState) => state.puzzle.progress.errorIndex
	)
	const temporaryValues = useSelector(
		(state: RootState) => state.puzzle.progress.temporaryValues
	)

	const dispatch = useDispatch()

	const autoRemovePencilmarks = (input: number, index: number) => {
		let inputRow = getRow(index)
		let inputCol = getCol(index)
		let inputBlock = getBlock(index)

		for (let i = 0; i < 81; i++) {
			if (
				i !== index &&
				(getRow(i) === inputRow ||
					getCol(i) === inputCol ||
					getBlock(i) === inputBlock)
			) {
				dispatch(removeFromPencilMarks([i, input]))
			}
		}
	}

	const handleScroll = (event: WheelEvent<SVGRectElement>) => {
		if (!leftClickDown && rightClickDown.length === 0) {
			dispatch(toggleMultiSelect())
		}
		for (let i = 0; i < rightClickDown.length; i++) {
			if (values[rightClickDown[i]] === null) {
				if (event.deltaY < 0) {
					if (temporaryValues[rightClickDown[i]] === null) {
						dispatch(addTemporary([rightClickDown[i], 1]))
					} else if (temporaryValues[rightClickDown[i]] === 9) {
						dispatch(deleteTemporary(rightClickDown[i]))
					} else {
						dispatch(incrementTemporary(rightClickDown[i]))
					}
				} else {
					if (temporaryValues[rightClickDown[i]] === null) {
						dispatch(addTemporary([rightClickDown[i], 9]))
					} else if (temporaryValues[rightClickDown[i]] === 1) {
						dispatch(deleteTemporary(rightClickDown[i]))
					} else {
						dispatch(decrementTemporary(rightClickDown[i]))
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
				if (event.shiftKey || event.ctrlKey || multiSelect) {
					if (!selected.includes(index)) {
						dispatch(addToSelected(index))
					}
					dispatch(setLeftClickDown(true))
				} else {
					dispatch(resetSelected([index]))
					if (values[index] !== null) {
						for (let i = 0; i < values.length; i++) {
							if (
								index !== i &&
								values[index] === values[i] &&
								!related.includes(i)
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
				for (let i = 0; i < selected.length; i++) {
					if (!prefilled.includes(selected[i])) {
						dispatch(deleteAll(selected[i]))
					}
				}
				break
			// Right click
			case 2:
				event.preventDefault()
				for (let i = 0; i < selected.length; i++) {
					if (!prefilled.includes(selected[i])) {
						dispatch(setRightClick(selected[i]))
						if (values[selected[i]] !== null && selected.length === 1) {
							dispatch(swapValueWithTemporary(selected[i]))
						}
					}
				}
				break
		}
	}
	const handleMouseMove = (index: number) => {
		if (leftClickDown && !selected.includes(index)) {
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
				if (
					rightClickDown.length === 1 &&
					pencilmarks[rightClickDown[0]].length === 0
				) {
					if (autoRemove && temporaryValues[rightClickDown[0]]) {
						autoRemovePencilmarks(
							temporaryValues[rightClickDown[0]]!,
							rightClickDown[0]
						)
					}
					dispatch(swapTemporaryWithValue(rightClickDown[0]))
				} else if (
					rightClickDown.length === 1 &&
					pencilmarks[rightClickDown[0]].length > 0
				) {
					if (temporaryValues[rightClickDown[0]] !== null) {
						if (
							!pencilmarks[rightClickDown[0]].includes(
								temporaryValues[rightClickDown[0]]!
							)
						) {
							dispatch(addTemporaryToPencil(rightClickDown[0]))
						} else {
							dispatch(removeTemporaryFromPencil(rightClickDown[0]))
						}
					}
				} else if (rightClickDown.length > 1) {
					for (let i = 0; i < rightClickDown.length; i++) {
						if (temporaryValues[rightClickDown[i]] !== null) {
							if (
								!pencilmarks[rightClickDown[i]].includes(
									temporaryValues[rightClickDown[i]]!
								)
							) {
								dispatch(addTemporaryToPencil(rightClickDown[i]))
							} else {
								dispatch(removeTemporaryFromPencil(rightClickDown[i]))
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
