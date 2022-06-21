const Diagonal = () => {
	return (
		<g className="diagonal">
			<line
				x1={(0 % 9) * 50}
				y1={Math.floor(0 / 9) * 50}
				x2={(80 % 9) * 50 + 50}
				y2={Math.floor(80 / 9) * 50 + 50}
			/>
			<line
				x1={(8 % 9) * 50 + 50}
				y1={Math.floor(8 / 9) * 50}
				x2={(72 % 9) * 50}
				y2={Math.floor(72 / 9) * 50 + 50}
			/>
		</g>
	)
}

export default Diagonal
