const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
})

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

const historyMessage = []

io.on('connection', (socket) => {
	socket.on('join room', (room) => {
		socket.join(room)

		historyMessage[room] = historyMessage[room] || []

		io.in(room).emit('previous messages', historyMessage[room])

		socket.on('chat message', (message) => {
			historyMessage[room].push(message)
			io.in(room).emit('append message', message)
		})
	})
})

server.listen(3080, () => {
	console.log('listening on *:3080')
})
