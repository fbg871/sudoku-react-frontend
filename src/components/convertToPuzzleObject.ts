import { createPref } from '../slices/puzzleSlice'

export const convertToPuzzle = (response: any) => {
	let obj = response

	obj.values = JSON.parse(obj.values)
	obj.solution = JSON.parse(obj.solution)
	obj.thermo = JSON.parse(obj.thermo)
	obj.arrow = JSON.parse(obj.arrow)
	obj.palindrome = JSON.parse(obj.palindrome)
	obj.diagonal = JSON.parse(obj.diagonal)
	obj.kropki = JSON.parse(obj.kropki)

	obj.prefilled = createPref()

	return obj
}

export const convertToProgress = (response: any) => {
	let newObj = {
		values: [],
		errorIndex: -1,
		temporaryValues: new Array(81).fill(null),
		pencilmarks: new Array(81).fill([]),
	}

	newObj.values = JSON.parse(response.values)
	newObj.pencilmarks = JSON.parse(response.pencilmarks)
	newObj.temporaryValues = JSON.parse(response.temporaryValues)
	newObj.errorIndex = response.errorIndex

	console.log('OIIIII')

	return newObj
}
