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
import { addValueAtIndex, deleteAll } from '../slices/creatorSlice'
import { MouseEvent, useState, WheelEvent, KeyboardEvent, useEffect } from 'react'

import { convertCodetoNumber } from '../convertCodetoNumber'

const useCreator = () => {
	const selection = useSelector((state: RootState) => state.selection)
	const creator = useSelector((state: RootState) => state.creator)

	const dispatch = useDispatch()

	useEffect(() => {
		console.log(creator.values)
	}, [creator.values])

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

				if (selection.selected.length === 1) {
					dispatch(addValueAtIndex([selection.selected[0], value]))
				}

				break
			case 'Delete':
			case 'Backspace':
				if (selection.selected.length === 1) {
					dispatch(deleteAll(selection.selected[0]))
				} else if (selection.selected.length > 1) {
					for (let i = 0; i < selection.selected.length; i++) {
						dispatch(deleteAll(selection.selected[i]))
					}
				}
				break
			case 'ArrowRight':
				if (last % 9 !== 8) {
					if (event.shiftKey && !selection.selected.includes(last + 1)) {
						dispatch(addToSelected(last + 1))
					} else {
						dispatch(resetSelected([last + 1]))
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
					}
				}
				break
			case 'ArrowUp':
				if (last > 8) {
					if (event.shiftKey && !selection.selected.includes(last - 9)) {
						dispatch(addToSelected(last - 9))
					} else {
						dispatch(resetSelected([last - 9]))
					}
				}
				break
			case 'ArrowDown':
				if (last < 72) {
					if (event.shiftKey && !selection.selected.includes(last + 9)) {
						dispatch(addToSelected(last + 9))
					} else {
						dispatch(resetSelected([last + 9]))
					}
				}
				break
		}
	}

	const handleMouseDown = (event: MouseEvent<SVGRectElement>, index: number) => {
		switch (event.button) {
			// Left click
			case 0:
				console.log(index)
				dispatch(purgeRelated())
				if (event.shiftKey || event.ctrlKey) {
					if (!selection.selected.includes(index)) {
						dispatch(addToSelected(index))
					}
					dispatch(setLeftClickDown(true))
				} else {
					dispatch(resetSelected([index]))
					if (creator.values[index] !== null) {
						for (let i = 0; i < creator.values.length; i++) {
							if (
								index !== i &&
								creator.values[index] === creator.values[i] &&
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
					dispatch(deleteAll(selection.selected[i]))
				}
				break
			// Right click
			case 2:
				event.preventDefault()
				for (let i = 0; i < selection.selected.length; i++) {
					dispatch(setRightClick(selection.selected[i]))
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
				dispatch(purgeRightClick())
				break
		}
	}
	return { handleMouseDown, handleMouseUp, handleMouseMove, handleKeyboard }
}

export default useCreator
