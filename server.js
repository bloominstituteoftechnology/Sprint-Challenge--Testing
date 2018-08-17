const express = require('express')

const server = express()

server.use(express.json())

let games = []
let id = 1

server.post('/games', (req, res) => {
  const { title, genre, releaseYear } = req.body

  if (!title || !genre) {
    return res.status(422).json({ error: 'title and genre field are required' })
  }

  if (games.find(game => game.title === title)) {
    return res.status(405).json({ error: 'title already in the database' })
  }

  const game = { id: id++, title, genre, releaseYear }
  games.push(game)
  res.status(201).json(game)
})

server.get('/games', (req, res) => {
  res.status(200).json(games)
})

server.get('/games/:id', (req, res) => {
  const { id } = req.params
  const foundGame = games.find(game => game.id === Number(id))
  if (!foundGame) {
    return res.status(404).json({ error: 'game not in database' })
  }
  res.status(200).json(foundGame)
})

server.delete('/games/:id', (req, res) => {
  const { id } = req.params
  const ogGames = games
  games = games.filter(game => game.id !== Number(id))
  console.log('LENGTH', ogGames.length, games.length)
  if (ogGames.length === games.length) {
    return res.status(404).json({ msg: 'game not found' })
  }
  if (ogGames.length - games.length === 1) {
    return res.status(200).json({ msg: `game with id ${id} deleted` })
  }
})

module.exports = server
