import { getCol, getRow } from './conflicting'

const isNeighbor = (index: number) => {
	let possibleNeighbors = []

	let row = getRow(index)
	let col = getCol(index)

	// Up-Left neighbor
	if (row !== 0 && col !== 0) {
		possibleNeighbors.push(index - 10)
	}

	// Up neighbor
	if (row !== 0) {
		possibleNeighbors.push(index - 9)
	}

	// Up-Right neighbor
	if (row !== 0 && col !== 8) {
		possibleNeighbors.push(index - 8)
	}

	// Right neighbor
	if (col !== 8) {
		possibleNeighbors.push(index + 1)
	}

	// Down-Right neighbor
	if (row !== 8 && col !== 8) {
		possibleNeighbors.push(index + 10)
	}

	// Down neighbor
	if (row !== 8) {
		possibleNeighbors.push(index + 9)
	}

	// Down Left neighbor
	if (row !== 8 && col !== 0) {
		possibleNeighbors.push(index + 8)
	}

	// Left neighbor
	if (col !== 0) {
		possibleNeighbors.push(index - 1)
	}

	return possibleNeighbors
}

export const checkValidThermo = (thermo: number[]) => {
	if (thermo.length <= 1 || thermo.length > 9) {
		return false
	}
	for (let i = 0; i < thermo.length - 1; i++) {
		let cellOne = thermo[i]
		let cellTwo = thermo[i + 1]

		if (!isNeighbor(cellOne).includes(cellTwo)) {
			return false
		}
	}
	return true
}

export const checkValidPalindrome = (palindrome: number[]) => {
	if (palindrome.length <= 1) {
		return false
	}
	for (let i = 0; i < palindrome.length - 1; i++) {
		let cellOne = palindrome[i]
		let cellTwo = palindrome[i + 1]

		if (!isNeighbor(cellOne).includes(cellTwo)) {
			return false
		}
	}
	return true
}
