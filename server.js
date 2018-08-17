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

server.post('/games', (req, res) => {
  if(!req.body || !req.body.title || !req.body.genre || !req.body.releaseYear)
    res.status(400).send('missing fields')

  res.status(200).json({...req.body, id: 1})
})

module.exports = server
