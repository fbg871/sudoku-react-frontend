import { Button, Typography } from '@mui/material'

const PuzzleComplete = () => {
	return (
		<div className="complete">
			<Typography variant="h4">Congrats!</Typography>
			<Button>Start a new puzzle</Button>
		</div>
	)
}

export default PuzzleComplete
