import { useState } from 'react'

const Signup = () => {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const axios = require('axios').default

	const validate = () => {
		return email.length > 5 && password.length > 7
	}

	const headers = {
		'Content-Type': 'application/json',
	}

	const handleSubmit = () => {
		console.log('yo')

		axios.post(
			'http://localhost:5000/signup',
			{
				username: username,
				email: email,
				password: password,
			},
			{ headers }
		)

		// fetch('http://localhost:5000/signup', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify({
		// 		username: username,
		// 		email: email,
		// 		password: password,
		// 	}),
		// })
	}

	return (
		<div>
			<input
				type="username"
				placeholder="Username"
				onChange={(e) => setUsername(e.target.value)}
			/>
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

export default Signup
