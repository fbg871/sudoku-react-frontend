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
	const prefilled = useSelector((state: RootState) => state.puzzle.puzzle.prefilled)

	const selection = useSelector((state: RootState) => state.selection)
	const puzzle = useSelector((state: RootState) => state.puzzle)
	const settings = useSelector((state: RootState) => state.settings)

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
		if (!selection.leftClickDown && selection.rightClickDown.length === 0) {
			dispatch(toggleMultiSelect())
		}
		for (let i = 0; i < selection.rightClickDown.length; i++) {
			if (puzzle.progress.values[selection.rightClickDown[i]] === null) {
				if (event.deltaY < 0) {
					if (
						puzzle.progress.temporaryValues[selection.rightClickDown[i]] === null
					) {
						dispatch(addTemporary([selection.rightClickDown[i], 1]))
					} else if (
						puzzle.progress.temporaryValues[selection.rightClickDown[i]] === 9
					) {
						dispatch(deleteTemporary(selection.rightClickDown[i]))
					} else {
						dispatch(incrementTemporary(selection.rightClickDown[i]))
					}
				} else {
					if (
						puzzle.progress.temporaryValues[selection.rightClickDown[i]] === null
					) {
						dispatch(addTemporary([selection.rightClickDown[i], 9]))
					} else if (
						puzzle.progress.temporaryValues[selection.rightClickDown[i]] === 1
					) {
						dispatch(deleteTemporary(selection.rightClickDown[i]))
					} else {
						dispatch(decrementTemporary(selection.rightClickDown[i]))
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
				if (event.shiftKey || event.ctrlKey || selection.multiSelect) {
					if (!selection.selected.includes(index)) {
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
								!selection.related.includes(i)
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
				for (let i = 0; i < selection.selected.length; i++) {
					if (!prefilled.includes(selection.selected[i])) {
						dispatch(deleteAll(selection.selected[i]))
					}
				}
				break
			// Right click
			case 2:
				event.preventDefault()
				for (let i = 0; i < selection.selected.length; i++) {
					if (!prefilled.includes(selection.selected[i])) {
						dispatch(setRightClick(selection.selected[i]))
						if (
							puzzle.progress.values[selection.selected[i]] !== null &&
							selection.selected.length === 1
						) {
							dispatch(swapValueWithTemporary(selection.selected[i]))
						}
					}
				}
				break
		}
	}
	const handleMouseMove = (index: number) => {
		if (selection.leftClickDown && !selection.selected.includes(index)) {
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
					selection.rightClickDown.length === 1 &&
					puzzle.progress.pencilmarks[selection.rightClickDown[0]].length === 0
				) {
					if (
						settings.autoRemove &&
						puzzle.progress.temporaryValues[selection.rightClickDown[0]]
					) {
						autoRemovePencilmarks(
							puzzle.progress.temporaryValues[selection.rightClickDown[0]]!,
							selection.rightClickDown[0]
						)
					}
					dispatch(swapTemporaryWithValue(selection.rightClickDown[0]))
				} else if (
					selection.rightClickDown.length === 1 &&
					puzzle.progress.pencilmarks[selection.rightClickDown[0]].length > 0
				) {
					if (
						puzzle.progress.temporaryValues[selection.rightClickDown[0]] !== null
					) {
						if (
							!puzzle.progress.pencilmarks[selection.rightClickDown[0]].includes(
								puzzle.progress.temporaryValues[selection.rightClickDown[0]]!
							)
						) {
							dispatch(addTemporaryToPencil(selection.rightClickDown[0]))
						} else {
							dispatch(removeTemporaryFromPencil(selection.rightClickDown[0]))
						}
					}
				} else if (selection.rightClickDown.length > 1) {
					for (let i = 0; i < selection.rightClickDown.length; i++) {
						if (
							puzzle.progress.temporaryValues[selection.rightClickDown[i]] !== null
						) {
							if (
								!puzzle.progress.pencilmarks[selection.rightClickDown[i]].includes(
									puzzle.progress.temporaryValues[selection.rightClickDown[i]]!
								)
							) {
								dispatch(addTemporaryToPencil(selection.rightClickDown[i]))
							} else {
								dispatch(removeTemporaryFromPencil(selection.rightClickDown[i]))
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
