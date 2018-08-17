const express = require('express')

const server = express(); 
server.use(express.json());

server.get('/games', (req, res) => {
  res.status(200).send('')
})

module.exports = server
