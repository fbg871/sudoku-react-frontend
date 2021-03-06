const codeTable: Record<string, number> = {
	Digit1: 1,
	Digit2: 2,
	Digit3: 3,
	Digit4: 4,
	Digit5: 5,
	Digit6: 6,
	Digit7: 7,
	Digit8: 8,
	Digit9: 9,
}

export const convertCodetoNumber = (code: string) => codeTable[code]
