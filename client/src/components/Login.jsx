import { useEffect, useState } from 'react'

export default function Login() {
	const [username, setUsername] = useState('')
	const [room, setRoom] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()

		if (!username && !room) return
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				name="room"
				id="room"
				value={room}
				onChange={(event) => {
					setRoom(event.target.value)
				}}
			/>
			<input
				type="text"
				name="username"
				id="username"
				value={username}
				onChange={(event) => {
					setUsername(event.target.value)
				}}
			/>
			<button>Login</button>
		</form>
	)
}
