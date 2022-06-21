import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { convertToObject } from 'typescript'
import { convertToPuzzle } from '../convertToPuzzleObject'

const Profile = () => {
	const [test, setTest] = useState('nothing')
	const [cookies, setCookies] = useCookies(['access_token'])

	// const getCookie = (name: string) => {
	// 	const value = `; ${document.cookie}`
	// 	const parts = value.split(`; ${name}=`)
	// 	if (parts.length === 2) return parts.pop()!.split(';').shift()
	// }

	const navigate = useNavigate()

	const axios = require('axios').default

	useEffect(() => {
		console.log(cookies)
		fetch('http://localhost:5000/api/profile', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('access_token')}`,
			},
		})
			.then((resp) => resp.json())
			.then((resp) => {
				if (resp.status !== 200) {
					navigate('/')
				}
			})
			.catch((err) => console.log(err.message))
	}, [])

	return (
		<div>
			Profile
			{localStorage.getItem('username') ? (
				<div>Logged in as: {localStorage.getItem('username')}</div>
			) : (
				<div>Not logged in.</div>
			)}
		</div>
	)
}

export default Profile
