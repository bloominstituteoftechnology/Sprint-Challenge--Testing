const express = require('express')

const server = express();

server.use(express.json())


server.get('/', (q, s) => {
  s.status(200).json({message: 'server up!'})
})

server.use('/games', require('./games'))

module.exports = server