import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { Socket } from 'socket.io-client'

type ChatProps = {
	socket: Socket
	username: string
}

export default function Chat({ socket, username }: ChatProps) {
	const [input, setInput] = useState('')
	const [response, setResponse] = useState<String[]>([])

	useEffect(() => {
		socket.on('append message', (message: string) => {
			setResponse((previousState) => {
				return [...previousState, message]
			})
		})

		return () => {
			socket.off('append message')
		}
	}, [])

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault()
		if (!input) return

		socket.emit('chat message', input)
		setInput('')
	}

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
