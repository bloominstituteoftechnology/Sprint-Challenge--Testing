const express = require('express')

const server = express(); 
server.use(express.json());

server.get('/games', (req, res) => {
  res.status(200).json([
    {
      title: 'wassup', 
      genre: 'kdjfadk',
      releaseYear: 4400
    }
  ])
})

module.exports = server
