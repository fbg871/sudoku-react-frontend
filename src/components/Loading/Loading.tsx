import { Box, CircularProgress } from '@mui/material'
import './loading.css'

const Loading = () => {
	// let elem: JSX.Element[] = []

	// for (let i = 0; i < 9; i++) {
	// 	for (let j = 0; j < 9; j++) {
	// 		elem.push(<div className={'cell num-' + (i + j)}></div>)
	// 	}
	// }

	return (
		<Box sx={{ display: 'flex' }}>
			<CircularProgress />
		</Box>
	)
}

export default Loading
