import { Button, Divider, TextField } from '@mui/material'
import { useSelector } from 'react-redux'
import useCreator from '../../../hooks/useCreator'
import { PurePuzzle } from '../../../slices/puzzleSlice'
import { RootState } from '../../../store'

const SideBar = () => {
	const { handleVariant } = useCreator()

	const creator = useSelector((root: RootState) => root.creator)

	const submitPuzzle = () => {
		console.log(JSON.stringify(creator))
	}

	return (
		<div className="sidebar">
			<TextField id="outlined-required" label="Title" />
			<TextField id="outlined" multiline label="Description" />
			<Button color="inherit" size="medium" onClick={() => handleVariant('thermo')}>
				Thermo
			</Button>
			<Button color="inherit" size="medium" onClick={() => handleVariant('arrow')}>
				Arrow
			</Button>
			<Button
				color="inherit"
				size="medium"
				onClick={() => handleVariant('palindrome')}>
				Palindrome
			</Button>
			<Button
				color="inherit"
				size="medium"
				onClick={() => handleVariant('diagonal')}>
				Diagonal
			</Button>
			<Button color="inherit" size="large" onClick={() => submitPuzzle()}>
				Submit puzzle
			</Button>
		</div>
	)
}

export default SideBar
