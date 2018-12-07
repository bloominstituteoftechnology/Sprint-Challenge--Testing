const express = require('express')
const helmet = require('helmet')
const server = express()

server.use(express.json())
server.use(helmet())

server.get('/', (req, res) => {
	console.log('working')
	res.status(200).json({ api: 'root endpoint is alive and well' })
})

server.get('/api/games', (req, res) => {
	const games = []
	res.status(200).json(games)
})

server.post('/api/games', (req, res) => {
	const { title, genre } = req.body
	!title || !genre
		? res.status(422).json({ message: 'Please provide the require information of title, genre, and release year.' })
		: res.status(201).json({ message: 'Success' })
})

module.exports = server
