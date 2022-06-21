import { BottomNavigation, BottomNavigationAction, Modal } from '@mui/material'
import { useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShareIcon from '@mui/icons-material/Share'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { setPuzzle } from '../../slices/puzzleSlice'
const GameBar = () => {
	const [value, setValue] = useState(0)

	const [open, setOpen] = useState(false)
	const handleOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}

	const dispatch = useDispatch()

	const puzzle = useSelector((root: RootState) => root.puzzle)

	return (
		<>
			<BottomNavigation
				showLabels
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue)
				}}
				sx={{
					'& .MuiBottomNavigationAction-root': {
						color: 'rgb(221, 221, 221)',
					},
					borderRadius: '0 0 5px 5px',
				}}
				className="bottom-nav">
				<BottomNavigationAction label="Like" icon={<FavoriteBorderIcon />} />
				<BottomNavigationAction label="Share" icon={<ShareIcon />} />
				<BottomNavigationAction
					onClick={handleOpen}
					label="Settings"
					icon={<SettingsIcon />}
				/>
			</BottomNavigation>
			<Modal className="settings-modal" open={open} onClose={handleClose}>
				<div>settings</div>
			</Modal>
		</>
	)
}

export default GameBar
