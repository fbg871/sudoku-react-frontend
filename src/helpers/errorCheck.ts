import { getBlock, getCol, getRow } from './conflicting'

const errorCheckOne = (input: number, index: number, values: (number | null)[]) => {
	let inputRow = getRow(index)
	let inputCol = getCol(index)
	let inputBlock = getBlock(index)

	for (let i = 0; i < 81; i++) {
		if (
			i !== index &&
			(getRow(i) === inputRow ||
				getCol(i) === inputCol ||
				getBlock(i) === inputBlock) &&
			input === values[i]
		) {
			return true
		}
	}
	return false
}

const errorCheckTwo = (input: number, index: number, solution: number[]) => {
	if (solution[index] !== input) {
		return true
	} else {
		return false
	}
}

export { errorCheckOne, errorCheckTwo }
