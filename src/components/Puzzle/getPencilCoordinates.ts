const coordinateTable: Record<number, number[]> = {
	1: [6, 14],
	2: [21, 14],
	3: [36, 14],
	4: [6, 29],
	5: [21, 29],
	6: [36, 29],
	7: [6, 44],
	8: [21, 44],
	9: [36, 44],
}

export const getPencilCoordinates = (pencil: number, index: number) => [
	(index % 9) * 50 + coordinateTable[pencil][0],
	Math.floor(index / 9) * 50 + coordinateTable[pencil][1],
]
