import { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

import Chat from './components/Chat'

const ENDPOINT = 'http://localhost:3080'

export default function App() {
	const [username, setUsername] = useState('')
	const [room, setRoom] = useState('')
	const [showChat, setShowChat] = useState(false)
	const socket = useRef()

	useEffect(() => {
		socket.current = io(ENDPOINT)
	}, [])

	const handleSubmit = (event) => {
		event.preventDefault()

		if (!username || !room) return

		socket.current.emit('join room', { room, username })
		setShowChat(true)
	}
	return (
		<div className="app">
			{!showChat ? (
				<div className="login-container">
					<form className="login-form" onSubmit={handleSubmit}>
						<input
							type="text"
							name="room"
							id="room"
							placeholder="room"
							value={room}
							onChange={(event) => {
								setRoom(event.target.value)
							}}
						/>
						<input
							type="text"
							name="username"
							id="username"
							placeholder="Username"
							value={username}
							onChange={(event) => {
								setUsername(event.target.value)
							}}
						/>
						<button>Login</button>
					</form>
				</div>
			) : (
				<Chat socket={socket} username={username} />
			)}
		</div>
	)
}
