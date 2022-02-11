// import '../Highlight/highlight.css'

// Generate prefilled values.
// isFilled -> <text/>
// !isFilled -> <text/><rect/>

const Prefill = ({ prefilled }: { prefilled: boolean[] }) => {
	let prefillElems: JSX.Element[] = []

	prefilled.forEach((pre, i) => {
		if (pre) {
			prefillElems.push(
				<rect
					key={i}
					y={Math.floor(i / 9) * 50}
					x={(i % 9) * 50}
					width="50"
					height="50"
				/>
			)
		}
	})

	return <g className="prefill">{prefillElems}</g>
}

export default Prefill
