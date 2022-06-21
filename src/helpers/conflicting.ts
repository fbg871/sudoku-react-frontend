const getCol = (index: number) => {
	return index % 9
}

const getRow = (index: number) => {
	return Math.floor(index / 9)
}

const getBlock = (index: number) => {
	if ([0, 1, 2].includes(getRow(index)) && [0, 1, 2].includes(getCol(index))) {
		return 1
	} else if (
		[0, 1, 2].includes(getRow(index)) &&
		[3, 4, 5].includes(getCol(index))
	) {
		return 2
	} else if (
		[0, 1, 2].includes(getRow(index)) &&
		[6, 7, 8].includes(getCol(index))
	) {
		return 3
	} else if (
		[3, 4, 5].includes(getRow(index)) &&
		[0, 1, 2].includes(getCol(index))
	) {
		return 4
	} else if (
		[3, 4, 5].includes(getRow(index)) &&
		[3, 4, 5].includes(getCol(index))
	) {
		return 5
	} else if (
		[3, 4, 5].includes(getRow(index)) &&
		[6, 7, 8].includes(getCol(index))
	) {
		return 6
	} else if (
		[6, 7, 8].includes(getRow(index)) &&
		[0, 1, 2].includes(getCol(index))
	) {
		return 7
	} else if (
		[6, 7, 8].includes(getRow(index)) &&
		[3, 4, 5].includes(getCol(index))
	) {
		return 8
	} else if (
		[6, 7, 8].includes(getRow(index)) &&
		[6, 7, 8].includes(getCol(index))
	) {
		return 9
	}
}

export { getRow, getCol, getBlock }
