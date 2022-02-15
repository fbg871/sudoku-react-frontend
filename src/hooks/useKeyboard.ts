import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import {
	addToRelated,
	addToSelected,
	purgeRelated,
	resetSelected,
} from '../slices/selectionSlice'
import {
	addPencilMarks,
	addValueAtIndex,
	appendToPencilMarks,
	deleteAll,
	removeFromPencilMarks,
	reverseError,
	setError,
} from '../slices/puzzleSlice'
import { KeyboardEvent } from 'react'

import { convertCodetoNumber } from '../convertCodetoNumber'
import { getBlock, getCol, getRow } from '../helpers/conflicting'
import { errorCheckOne } from '../helpers/errorCheck'

const useKeyboard = () => {
	// From settings slice
	const autoRemove = useSelector((state: RootState) => state.settings)
	// From selection slice
	const selected = useSelector((state: RootState) => state.selection.selected)
	const related = useSelector((state: RootState) => state.selection.related)
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

	const handleKeyboard = (event: KeyboardEvent<SVGRectElement>) => {
		let endIndex = selected.length - 1
		let last = selected[endIndex]

		switch (event.code) {
			case 'Digit1':
			case 'Digit2':
			case 'Digit3':
			case 'Digit4':
			case 'Digit5':
			case 'Digit6':
			case 'Digit7':
			case 'Digit8':
			case 'Digit9':
				const value = convertCodetoNumber(event.code)

				if (selected.length === 1 && !prefilled.includes(selected[0])) {
					if (errorIndex !== -1 || errorIndex === selected[0]) {
						if (event.shiftKey) {
							if (pencilmarks[selected[0]].length === 0) {
								dispatch(addPencilMarks([selected[0], [value]]))
							} else {
								if (!pencilmarks[selected[0]].includes(value)) {
									dispatch(appendToPencilMarks([selected[0], value]))
								} else {
									dispatch(removeFromPencilMarks([selected[0], value]))
								}
							}
						} else {
							if (autoRemove) {
								autoRemovePencilmarks(value, selected[0])
							}
							dispatch(addValueAtIndex([selected[0], value]))
							dispatch(purgeRelated())
							if (errorCheckOne(value, selected[0], values)) {
								dispatch(setError(selected[0]))
							} else {
								dispatch(reverseError())
							}
							if (value !== null) {
								for (let i = 0; i < values.length; i++) {
									// funky business going on here. enter same value
									// twice and see
									if (
										selected[0] !== i &&
										value === values[i] &&
										!related.includes(i)
									) {
										dispatch(addToRelated(i))
									}
								}
							} else {
								dispatch(purgeRelated())
							}
						}
					}
				} else if (selected.length > 1) {
					for (let i = 0; i < selected.length; i++) {
						if (!prefilled.includes(selected[i])) {
							if (pencilmarks[selected[i]].length === 0) {
								dispatch(addPencilMarks([selected[i], [value]]))
							} else {
								if (!pencilmarks[selected[i]].includes(value)) {
									dispatch(appendToPencilMarks([selected[i], value]))
								} else {
									dispatch(removeFromPencilMarks([selected[i], value]))
								}
							}
						}
					}
				}

				break
			case 'Delete':
			case 'Backspace':
				if (selected.length === 1 && !prefilled.includes(selected[0])) {
					if (errorIndex === selected[0]) {
						dispatch(reverseError())
					}

					dispatch(deleteAll(selected[0]))
				} else if (selected.length > 1) {
					for (let i = 0; i < selected.length; i++) {
						if (!prefilled.includes(selected[i])) {
							dispatch(deleteAll(selected[i]))
						}
					}
				}
				dispatch(purgeRelated())
				break
			case 'ArrowRight':
				if (last % 9 !== 8) {
					if (event.shiftKey && !selected.includes(last + 1)) {
						dispatch(addToSelected(last + 1))
						dispatch(purgeRelated())
					} else {
						dispatch(resetSelected([last + 1]))
						if (values[last + 1] !== null) {
							for (let i = 0; i < values.length; i++) {
								if (
									last + 1 !== i &&
									values[last + 1] === values[i] &&
									!related.includes(i)
								) {
									dispatch(addToRelated(i))
								}
							}
						} else {
							dispatch(purgeRelated())
						}
					}
				}
				break
			case 'ArrowLeft':
				if (last % 9 !== 0) {
					if (event.shiftKey && !selected.includes(last - 1)) {
						dispatch(addToSelected(last - 1))
						dispatch(purgeRelated())
					} else {
						dispatch(resetSelected([last - 1]))
						if (values[last - 1] !== null) {
							for (let i = 0; i < values.length; i++) {
								if (
									last - 1 !== i &&
									values[last - 1] === values[i] &&
									!related.includes(i)
								) {
									dispatch(addToRelated(i))
								}
							}
						} else {
							dispatch(purgeRelated())
						}
					}
				}
				break
			case 'ArrowUp':
				if (last > 8) {
					if (event.shiftKey && !selected.includes(last - 9)) {
						dispatch(addToSelected(last - 9))
						dispatch(purgeRelated())
					} else {
						dispatch(resetSelected([last - 9]))
						if (values[last - 9] !== null) {
							for (let i = 0; i < values.length; i++) {
								if (
									last - 9 !== i &&
									values[last - 9] === values[i] &&
									!related.includes(i)
								) {
									dispatch(addToRelated(i))
								}
							}
						} else {
							dispatch(purgeRelated())
						}
					}
				}
				break
			case 'ArrowDown':
				if (last < 72) {
					if (event.shiftKey && !selected.includes(last + 9)) {
						dispatch(addToSelected(last + 9))
						dispatch(purgeRelated())
					} else {
						dispatch(resetSelected([last + 9]))
						if (values[last + 9] !== null) {
							for (let i = 0; i < values.length; i++) {
								if (
									last + 9 !== i &&
									values[last + 9] === values[i] &&
									!related.includes(i)
								) {
									dispatch(addToRelated(i))
								}
							}
						} else {
							dispatch(purgeRelated())
						}
					}
				}
				break
		}
	}

	return handleKeyboard
}

export default useKeyboard
