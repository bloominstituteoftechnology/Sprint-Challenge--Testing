const express = require('express')

const server = express()

server.use(express.json())

const games = []
let id = 1

server.post('/games', (req, res) => {
  const { title, genre, releaseYear } = req.body

  if (!title || !genre) {
    return res.status(422).json({ error: 'title and genre field are required' })
  }
  const game = { id: id++, title, genre, releaseYear }
  games.push(game)
  res.status(201).json(game)
})

server.get('/games', (req, res) => {
  res.status(200).json(games)
})
module.exports = server
