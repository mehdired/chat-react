import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { Socket } from 'socket.io-client'

type ChatProps = {
	socket: Socket
	username: string
}

type Message = {
	username: string
	message: string
}

export default function Chat({ socket, username }: ChatProps) {
	const [input, setInput] = useState('')
	const [response, setResponse] = useState<Message[]>([])

	useEffect(() => {
		socket.on('previous messages', (historyMessage: Message[]) => {
			setResponse(historyMessage)
		})

		socket.on('append message', (message: Message) => {
			setResponse((previousState) => {
				return [...previousState, message]
			})
		})

		return () => {
			socket.off('previous messages')
			socket.off('append message')
		}
	}, [])

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault()
		if (!input) return

		socket.emit('chat message', { username, message: input })
		setInput('')
	}

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInput(event.target.value)
	}

	return (
		<>
			<ul className="chat-messages">
				{response.map((data, index) => (
					<li key={index}>
						<span>{data.username} : </span>
						<p>{data.message}</p>
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
