import React from 'react'
import { PurePuzzle } from '../slices/puzzleSlice'

export default class APIService {
	static InsertPuzzle(body: PurePuzzle) {
		return fetch('http://localhost:5000/add_puzzle', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})
			.then((response) => response.json())
			.catch((error) => console.log(error))
	}
}
