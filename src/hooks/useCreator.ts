import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import {
	addValueAtIndex,
	deleteAll,
	addToSelected,
	resetSelected,
	setRightClick,
	setLeftClickDown,
	purgeRightClick,
	addThermo,
	toggleDiagonal,
	addArrow,
	addPalindrome,
} from '../slices/creatorSlice'
import { MouseEvent, useState, WheelEvent, KeyboardEvent, useEffect } from 'react'

import { convertCodetoNumber } from '../convertCodetoNumber'
import { checkValidPalindrome, checkValidThermo } from '../helpers/variantCheck'

const useCreator = () => {
	const creator = useSelector((state: RootState) => state.creator)

	const dispatch = useDispatch()

	const handleVariant = (type: string) => {
		if (type === 'thermo' && checkValidThermo(creator.selected)) {
			dispatch(addThermo(creator.selected))
		} else if (type === 'diagonal') {
			dispatch(toggleDiagonal())
		} else if (type === 'arrow') {
			dispatch(addArrow(creator.selected))
		} else if (type === 'palindrome' && checkValidPalindrome(creator.selected)) {
			dispatch(addPalindrome(creator.selected))
		}
	}

	const handleKeyboard2 = (event: KeyboardEvent<SVGRectElement>) => {
		let endIndex = creator.selected.length - 1
		let last = creator.selected[endIndex]

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

				if (creator.selected.length === 1) {
					dispatch(addValueAtIndex([creator.selected[0], value]))
				}

				break
			case 'Delete':
			case 'Backspace':
				if (creator.selected.length === 1) {
					dispatch(deleteAll(creator.selected[0]))
				} else if (creator.selected.length > 1) {
					for (let i = 0; i < creator.selected.length; i++) {
						dispatch(deleteAll(creator.selected[i]))
					}
				}
				break
			case 'ArrowRight':
				if (last % 9 !== 8) {
					if (event.shiftKey && !creator.selected.includes(last + 1)) {
						dispatch(addToSelected(last + 1))
					} else {
						dispatch(resetSelected([last + 1]))
					}
				}
				break
			case 'ArrowLeft':
				if (last % 9 !== 0) {
					if (event.shiftKey && !creator.selected.includes(last - 1)) {
						dispatch(addToSelected(last - 1))
					} else {
						dispatch(resetSelected([last - 1]))
					}
				}
				break
			case 'ArrowUp':
				if (last > 8) {
					if (event.shiftKey && !creator.selected.includes(last - 9)) {
						dispatch(addToSelected(last - 9))
					} else {
						dispatch(resetSelected([last - 9]))
					}
				}
				break
			case 'ArrowDown':
				if (last < 72) {
					if (event.shiftKey && !creator.selected.includes(last + 9)) {
						dispatch(addToSelected(last + 9))
					} else {
						dispatch(resetSelected([last + 9]))
					}
				}
				break
		}
	}

	const handleMouseDown2 = (event: MouseEvent<SVGRectElement>, index: number) => {
		switch (event.button) {
			// Left click
			case 0:
				if (event.shiftKey || event.ctrlKey) {
					if (!creator.selected.includes(index)) {
						dispatch(addToSelected(index))
					}
					dispatch(setLeftClickDown(true))
				} else {
					dispatch(resetSelected([index]))
					dispatch(setLeftClickDown(true))
				}
				break
			// Middle click
			case 1:
				for (let i = 0; i < creator.selected.length; i++) {
					dispatch(deleteAll(creator.selected[i]))
				}
				break
			// Right click
			case 2:
				event.preventDefault()
				for (let i = 0; i < creator.selected.length; i++) {
					dispatch(setRightClick(creator.selected[i]))
				}
				break
		}
	}
	const handleMouseMove2 = (index: number) => {
		if (creator.leftClickDown && !creator.selected.includes(index)) {
			dispatch(addToSelected(index))
		}
	}
	const handleMouseUp2 = (
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
	return {
		handleVariant,
		handleMouseDown2,
		handleMouseUp2,
		handleMouseMove2,
		handleKeyboard2,
	}
}

export default useCreator
