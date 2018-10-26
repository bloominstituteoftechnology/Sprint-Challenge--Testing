const express = require('express')
const gameRouters = require('./games/gamesRouters.js')
const server = express()


server.use(express.json())

server.use('/games', gameRouters)

module.exports = server