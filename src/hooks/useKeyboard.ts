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

import { solved_flat } from '../sudoku_test'
import { convertCodetoNumber } from '../convertCodetoNumber'
import { getBlock, getCol, getRow } from '../helpers/conflicting'
import { errorCheckOne } from '../helpers/errorCheck'

const useKeyboard = () => {
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

	const handleKeyboard = (event: KeyboardEvent<SVGRectElement>) => {
		let endIndex = selection.selected.length - 1
		let last = selection.selected[endIndex]

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

				if (
					selection.selected.length === 1 &&
					!puzzle.puzzle.prefilled.includes(selection.selected[0])
				) {
					if (
						!puzzle.progress.error ||
						(puzzle.progress.error &&
							puzzle.progress.errorIndex === selection.selected[0])
					) {
						if (event.shiftKey) {
							if (puzzle.progress.pencilmarks[selection.selected[0]].length === 0) {
								dispatch(addPencilMarks([selection.selected[0], [value]]))
							} else {
								if (
									!puzzle.progress.pencilmarks[selection.selected[0]].includes(value)
								) {
									dispatch(appendToPencilMarks([selection.selected[0], value]))
								} else {
									dispatch(removeFromPencilMarks([selection.selected[0], value]))
								}
							}
						} else {
							if (settings.autoRemove) {
								autoRemovePencilmarks(value, selection.selected[0])
							}
							dispatch(addValueAtIndex([selection.selected[0], value]))
							dispatch(purgeRelated())
							if (
								errorCheckOne(value, selection.selected[0], puzzle.progress.values)
							) {
								dispatch(setError(selection.selected[0]))
							} else {
								dispatch(reverseError())
							}
							if (value !== null) {
								for (let i = 0; i < puzzle.progress.values.length; i++) {
									// funky business going on here. enter same value
									// twice and see
									if (
										selection.selected[0] !== i &&
										value === puzzle.progress.values[i] &&
										!selection.related.includes(i)
									) {
										dispatch(addToRelated(i))
									}
								}
							} else {
								dispatch(purgeRelated())
							}
						}
					}
				} else if (selection.selected.length > 1) {
					for (let i = 0; i < selection.selected.length; i++) {
						if (!puzzle.puzzle.prefilled.includes(selection.selected[i])) {
							if (puzzle.progress.pencilmarks[selection.selected[i]].length === 0) {
								dispatch(addPencilMarks([selection.selected[i], [value]]))
							} else {
								if (
									!puzzle.progress.pencilmarks[selection.selected[i]].includes(value)
								) {
									dispatch(appendToPencilMarks([selection.selected[i], value]))
								} else {
									dispatch(removeFromPencilMarks([selection.selected[i], value]))
								}
							}
						}
					}
				}

				break
			case 'Delete':
			case 'Backspace':
				if (
					selection.selected.length === 1 &&
					!puzzle.puzzle.prefilled.includes(selection.selected[0])
				) {
					if (
						puzzle.progress.error &&
						puzzle.progress.errorIndex === selection.selected[0]
					) {
						dispatch(reverseError())
					}

					dispatch(deleteAll(selection.selected[0]))
				} else if (selection.selected.length > 1) {
					for (let i = 0; i < selection.selected.length; i++) {
						if (!puzzle.puzzle.prefilled.includes(selection.selected[i])) {
							dispatch(deleteAll(selection.selected[i]))
						}
					}
				}
				dispatch(purgeRelated())
				break
			case 'ArrowRight':
				if (last % 9 !== 8) {
					if (event.shiftKey && !selection.selected.includes(last + 1)) {
						dispatch(addToSelected(last + 1))
						dispatch(purgeRelated())
					} else {
						dispatch(resetSelected([last + 1]))
						if (puzzle.progress.values[last + 1] !== null) {
							for (let i = 0; i < puzzle.progress.values.length; i++) {
								if (
									last + 1 !== i &&
									puzzle.progress.values[last + 1] === puzzle.progress.values[i] &&
									!selection.related.includes(i)
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
					if (event.shiftKey && !selection.selected.includes(last - 1)) {
						dispatch(addToSelected(last - 1))
						dispatch(purgeRelated())
					} else {
						dispatch(resetSelected([last - 1]))
						if (puzzle.progress.values[last - 1] !== null) {
							for (let i = 0; i < puzzle.progress.values.length; i++) {
								if (
									last - 1 !== i &&
									puzzle.progress.values[last - 1] === puzzle.progress.values[i] &&
									!selection.related.includes(i)
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
					if (event.shiftKey && !selection.selected.includes(last - 9)) {
						dispatch(addToSelected(last - 9))
						dispatch(purgeRelated())
					} else {
						dispatch(resetSelected([last - 9]))
						if (puzzle.progress.values[last - 9] !== null) {
							for (let i = 0; i < puzzle.progress.values.length; i++) {
								if (
									last - 9 !== i &&
									puzzle.progress.values[last - 9] === puzzle.progress.values[i] &&
									!selection.related.includes(i)
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
					if (event.shiftKey && !selection.selected.includes(last + 9)) {
						dispatch(addToSelected(last + 9))
						dispatch(purgeRelated())
					} else {
						dispatch(resetSelected([last + 9]))
						if (puzzle.progress.values[last + 9] !== null) {
							for (let i = 0; i < puzzle.progress.values.length; i++) {
								if (
									last + 9 !== i &&
									puzzle.progress.values[last + 9] === puzzle.progress.values[i] &&
									!selection.related.includes(i)
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
