import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import './header.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Container, createTheme, Link } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import { RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { destroyUser } from '../../slices/userSlice'

const Header = () => {
	const darkTheme = createTheme()

	const [username, setUsername] = useState('')

	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		if (localStorage.getItem('username')) {
			setUsername(localStorage.getItem('username')!)
		} else {
			setUsername('')
		}
	})

	const user = useSelector((state: RootState) => state.user)

	const handleLogout = () => {
		localStorage.removeItem('access_token')
		localStorage.removeItem('username')
		localStorage.removeItem('email')
		dispatch(destroyUser())
		navigate('/')
	}

	return (
		<AppBar elevation={0} position="static">
			<Toolbar className="header-bar">
				<IconButton
					className="hand-button"
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{ mr: 2 }}
					href="/play">
					<img className="icondark" width="55px" />
				</IconButton>
				<Container className="logo">
					<Link href="/create" underline="none">
						<Typography className="title" variant="h3">
							s u d o k u
						</Typography>
					</Link>
					<Typography className="title" variant="h4">
						.surf
					</Typography>
				</Container>
				<IconButton href="/settings" color="inherit">
					<SettingsIcon />
				</IconButton>
				{username ? (
					<Button color="inherit" size="medium" onClick={handleLogout}>
						{localStorage.getItem('username')}
					</Button>
				) : (
					<Button color="inherit" size="medium" href="/login">
						Log in
					</Button>
				)}
			</Toolbar>
		</AppBar>
	)
}

export default Header
