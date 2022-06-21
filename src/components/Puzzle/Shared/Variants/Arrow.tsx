const Arrow = ({ arrow }: { arrow: number[][] }) => {
	let elem: JSX.Element[] = []

	for (let i = 0; i < arrow.length; i++) {
		for (let j = 0; j < arrow[i].length - 1; j++) {
			let startpoint = arrow[i][j]
			let endpoint = arrow[i][j + 1]
			elem.push(
				<line
					x1={(startpoint % 9) * 50 + 25}
					x2={(endpoint % 9) * 50 + 25}
					y1={Math.floor(startpoint / 9) * 50 + 25}
					y2={Math.floor(endpoint / 9) * 50 + 25}
				/>
			)
			if (j === 0) {
				elem.push(
					<circle
						cx={(arrow[i][j] % 9) * 50 + 25}
						cy={Math.floor(arrow[i][j] / 9) * 50 + 25}
						r="20"
					/>
				)
			} else if (j === arrow[i].length - 2) {
				elem.push(<g></g>)
			}
		}
	}

	return <g className="arrow">{elem}</g>
}

export default Arrow
