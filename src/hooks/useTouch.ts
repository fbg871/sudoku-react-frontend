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
	addTemporaryToPencil,
	deleteAll,
	removeFromPencilMarks,
	removeTemporaryFromPencil,
	swapTemporaryWithValue,
	swapValueWithTemporary,
} from '../slices/puzzleSlice'
import { MouseEvent, TouchEvent } from 'react'
import { getBlock, getCol, getRow } from '../helpers/conflicting'

const useTouch = () => {
	const selected = useSelector((state: RootState) => state.selection.selected)
	const related = useSelector((state: RootState) => state.selection.related)

	const leftClickDown = useSelector(
		(state: RootState) => state.selection.leftClickDown
	)

	// From progress slice
	const values = useSelector((state: RootState) => state.puzzle.progress.values)

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

	const handleFingerDown = (event: TouchEvent<SVGRectElement>, index: number) => {
		dispatch(resetSelected([index]))
		if (values[index] !== null) {
			for (let i = 0; i < values.length; i++) {
				if (index !== i && values[index] === values[i] && !related.includes(i)) {
					dispatch(addToRelated(i))
				}
			}
		} else {
			dispatch(purgeRelated())
		}
		dispatch(setLeftClickDown(true))
	}

	const handleFingerMove = (e: TouchEvent<SVGRectElement>) => {
		const index = document
			.elementFromPoint(e.touches[0].pageX, e.touches[0].pageY)
			?.getAttribute('data-index')

		if (index !== null && leftClickDown && !selected.includes(parseInt(index!))) {
			dispatch(addToSelected(parseInt(index!)))
			dispatch(purgeRelated())
		}
	}
	const handleFingerUp = () => {
		dispatch(setLeftClickDown(false))

		// switch (event.button) {
		// 	// Left click released
		// 	case 0:
		// 		dispatch(setLeftClickDown(false))
		// 		break
		// 	// Right click released
		// 	case 2:
		// 		event.preventDefault()
		// 		if (
		// 			rightClickDown.length === 1 &&
		// 			pencilmarks[rightClickDown[0]].length === 0
		// 		) {
		// 			if (autoRemove && temporaryValues[rightClickDown[0]]) {
		// 				autoRemovePencilmarks(
		// 					temporaryValues[rightClickDown[0]]!,
		// 					rightClickDown[0]
		// 				)
		// 			}
		// 			dispatch(swapTemporaryWithValue(rightClickDown[0]))
		// 		} else if (
		// 			rightClickDown.length === 1 &&
		// 			pencilmarks[rightClickDown[0]].length > 0
		// 		) {
		// 			if (temporaryValues[rightClickDown[0]] !== null) {
		// 				if (
		// 					!pencilmarks[rightClickDown[0]].includes(
		// 						temporaryValues[rightClickDown[0]]!
		// 					)
		// 				) {
		// 					dispatch(addTemporaryToPencil(rightClickDown[0]))
		// 				} else {
		// 					dispatch(removeTemporaryFromPencil(rightClickDown[0]))
		// 				}
		// 			}
		// 		} else if (rightClickDown.length > 1) {
		// 			for (let i = 0; i < rightClickDown.length; i++) {
		// 				if (temporaryValues[rightClickDown[i]] !== null) {
		// 					if (
		// 						!pencilmarks[rightClickDown[i]].includes(
		// 							temporaryValues[rightClickDown[i]]!
		// 						)
		// 					) {
		// 						dispatch(addTemporaryToPencil(rightClickDown[i]))
		// 					} else {
		// 						dispatch(removeTemporaryFromPencil(rightClickDown[i]))
		// 					}
		// 				}
		// 			}
		// 		}
		// 		dispatch(purgeRightClick())
		// 		break
		// }
	}
	return { handleFingerDown, handleFingerUp, handleFingerMove }
}

export default useTouch
