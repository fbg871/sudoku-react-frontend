const Palindrome = ({ palindrome }: { palindrome: number[][] }) => {
	let elem: JSX.Element[] = []

	for (let i = 0; i < palindrome.length; i++) {
		for (let j = 0; j < palindrome[i].length - 1; j++) {
			let startpoint = palindrome[i][j + 1]
			let endpoint = palindrome[i][j]

			// add "overlapping <line>" if cell is repeated
			elem.push(
				<line
					strokeLinecap="round"
					x1={(startpoint % 9) * 50 + 25}
					x2={(endpoint % 9) * 50 + 25}
					y1={Math.floor(startpoint / 9) * 50 + 25}
					y2={Math.floor(endpoint / 9) * 50 + 25}
				/>
			)
		}
	}

	return <g className="palindrome">{elem}</g>
}

export default Palindrome
