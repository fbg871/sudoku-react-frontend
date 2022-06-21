import {
	FormControlLabel,
	FormGroup,
	Switch,
	ToggleButton,
	Typography,
} from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import storage from 'redux-persist/lib/storage'
import {
	toggleAutoRemove,
	toggleBorder,
	toggleDarkMode,
	toggleFocusMode,
	toggleHighlightRelated,
	togglePrefill,
} from '../../slices/settingsSlice'
import { RootState } from '../../store'

const Settings = () => {
	const settings = useSelector((root: RootState) => root.settings)

	const dispatch = useDispatch()

	const fetchSettingsDb = () => {}

	const saveSettings = () => {
		fetch('http://localhost:5000/add_settings/1', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				settings: settings,
			}),
		})
			.then((res) => res.json())
			.then((result) => console.log(result))
			.catch((err) => console.log('error happened, savesettings func'))
	}

	useEffect(() => {
		var a = localStorage.getItem('sudoku-settings')
		if (a) {
			console.log('yomama')
			console.log(a)
		} else {
			console.log('nostorage')
			fetchSettingsDb()
		}
	}, [])

	useEffect(() => {
		saveSettings()
		console.log('saved')
	}, [settings])

	return (
		<div>
			<Typography variant="h1" align="center">
				Settings
			</Typography>
			<FormGroup>
				<FormControlLabel
					control={
						<Switch
							onClick={() => dispatch(toggleAutoRemove())}
							checked={settings.autoRemove}
						/>
					}
					label={<Typography className="settings-label">Auto-remove</Typography>}
				/>

				<FormControlLabel
					control={
						<Switch
							onClick={() => dispatch(toggleFocusMode())}
							checked={settings.focusMode}
						/>
					}
					label={<Typography className="settings-label">Focus mode</Typography>}
				/>
				<FormControlLabel
					control={
						<Switch
							onClick={() => dispatch(toggleDarkMode())}
							checked={settings.darkMode}
						/>
					}
					label={<Typography className="settings-label">Dark mode</Typography>}
				/>
				<FormControlLabel
					control={
						<Switch
							onClick={() => dispatch(toggleHighlightRelated())}
							checked={settings.highlightRelated}
						/>
					}
					label={
						<Typography className="settings-label">
							Highlight related cells
						</Typography>
					}
				/>
				<FormControlLabel
					control={
						<Switch
							onClick={() => dispatch(togglePrefill())}
							checked={settings.prefillCell}
						/>
					}
					label={<Typography className="settings-label">Prefilled</Typography>}
				/>
				<FormControlLabel
					control={
						<Switch
							onClick={() => dispatch(toggleBorder())}
							checked={settings.border}
						/>
					}
					label={<Typography className="settings-label">Border</Typography>}
				/>
			</FormGroup>
		</div>
	)
}

export default Settings
