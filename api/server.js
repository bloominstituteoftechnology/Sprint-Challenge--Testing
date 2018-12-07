const express = require('express')
const helmet = require('helmet')
const server = express()

server.use(express.json())
server.use(helmet())

server.get('/', (req, res) => {
	console.log('working')
	res.status(200).json({ api: 'root endpoint is alive and well' })
})

module.exports = server