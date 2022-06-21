import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../slices/userSlice'
import { RootState } from '../../store'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const validate = () => {
		return email.length > 4 && password.length > 7
	}

	const user = useSelector((state: RootState) => state.user)

	const dispatch = useDispatch()

	const handleSubmit = async () => {
		if (validate()) {
			const response = await fetch('http://localhost:5000/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			})

			if (response.status === 200) {
				let val = await response.json()
				console.log(val['access_token'])
				localStorage.setItem('access_token', val['access_token'])
				localStorage.setItem('username', val['username'])
				localStorage.setItem('email', val['email'])

				dispatch(setUser([val['username'], val['email']]))
			}
		}
	}

	return (
		<div>
			<input
				type="email"
				placeholder="Email"
				onChange={(e) => setEmail(e.target.value)}
			/>

			<input
				type="password"
				placeholder="Password"
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={() => handleSubmit()}>Submit</button>
		</div>
	)
}

export default Login
