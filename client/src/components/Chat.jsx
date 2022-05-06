import { useState, useEffect } from 'react'

export default function Chat({ socket, username }) {
	const [input, setInput] = useState('')
	const [response, setResponse] = useState([])

	useEffect(() => {
		socket.current.on('append message', (message) => {
			setResponse((previousState) => {
				return [...previousState, message]
			})
		})

		return () => socket.current.off('append message')
	}, [])

	const handleSubmit = (event) => {
		event.preventDefault()
		if (!input) return

		socket.current.emit('chat message', input)
		setInput('')
	}

	const handleChange = (event) => {
		setInput(event.target.value)
	}
	return (
		<>
			<ul className="chat-messages">
				{response.map((message, index) => (
					<li key={index}>
						<span>{username} : </span>
						<p>{message}</p>
					</li>
				))}
			</ul>
			<form className="chat-form" action="" onSubmit={handleSubmit}>
				<input className="chat-input" value={input} onChange={handleChange} />
				<button>Send</button>
			</form>
		</>
	)
}
