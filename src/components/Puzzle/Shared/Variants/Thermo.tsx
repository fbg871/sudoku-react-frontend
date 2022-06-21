import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'

const Thermo = ({ thermo }: { thermo: number[][] }) => {
	let elem: JSX.Element[] = []

	if (thermo.length > 0) {
		for (let i = 0; i < thermo.length; i++) {
			// Look through indices, except the last one because it's not
			// necessary
			for (let j = 0; j < thermo[i].length - 1; j++) {
				let startpoint = thermo[i][j + 1]
				let endpoint = thermo[i][j]
				if (j === 0) {
					elem.push(
						<circle
							cx={(thermo[i][j] % 9) * 50 + 25}
							cy={Math.floor(thermo[i][j] / 9) * 50 + 25}
							r="20"
						/>
					)
				}

				elem.push(
					<line
						strokeWidth="10"
						strokeLinecap="round"
						x1={(startpoint % 9) * 50 + 25}
						x2={(endpoint % 9) * 50 + 25}
						y1={Math.floor(startpoint / 9) * 50 + 25}
						y2={Math.floor(endpoint / 9) * 50 + 25}
					/>
				)
			}
		}
	}

	return <g className="thermo">{elem}</g>
}

export default Thermo
