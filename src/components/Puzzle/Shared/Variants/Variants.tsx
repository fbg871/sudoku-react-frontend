import { useSelector } from 'react-redux'
import puzzleSlice from '../../../../slices/puzzleSlice'
import { RootState } from '../../../../store'
import Arrow from './Arrow'
import Diagonal from './Diagonal'
import Palindrome from './Palindrome'
import Thermo from './Thermo'
import './variants.css'

const Variants = ({ createMode }: { createMode: boolean }) => {
	const player = useSelector((state: RootState) => state.puzzle)
	const creator = useSelector((state: RootState) => state.creator)

	if (createMode) {
		return (
			<g className="variants">
				<Thermo thermo={creator.thermo} />
				<Arrow arrow={creator.arrow} />
				<Palindrome palindrome={creator.palindrome} />
				{creator.diagonal && <Diagonal />}
			</g>
		)
	} else {
		return (
			<g className="variants">
				<Thermo thermo={player.puzzle.thermo} />
				<Arrow arrow={player.puzzle.arrow} />
				<Palindrome palindrome={player.puzzle.palindrome} />
				{player.puzzle.diagonal && <Diagonal />}
			</g>
		)
	}
}

export default Variants
