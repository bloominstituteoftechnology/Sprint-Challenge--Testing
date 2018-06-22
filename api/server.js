const express = require('express')
const morgan = require('morgan')

const Game = require('../games/Game')

const server = express()

server.use(express.json())
server.use(morgan('combined'))

server.post('/api/games', (req, res) => {
  Game.create(req.body)
    .then(game => {
      res.status(201).json(game)
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'Error saving data to the DB', error: err })
    })
})

server.get('/api/games', (req, res) => {
  Game.find({})
    .then(games => {
      res.status(200).json(games)
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'Something really bad happened', error: err })
    })
})

server.put('/api/games/:id', (req, res) => {
  const { id } = req.params
  const changes = req.body

  // All we care about is the game title and id. Don't worry about genre or date.
  if (!changes.title || !id) {
    return res.status(422).json({ error: 'Must Provide a title && Id' })
  }

  const options = {
    new: true
  }

  Game.findByIdAndUpdate(id, changes, options)
    .then(game => {
      if (game) {
        res.status(200).json(game)
      } else {
        res.status(404).json({ message: 'Game not found' })
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'Something really bad happened', error: err })
    })
})

server.delete('/api/games/:id', (req, res) => {
  const { id } = req.params

  if (!id) {
    res.status(422).json({ message: 'You need to give me an ID' })
  } else {
    Game.findByIdAndRemove(id)
      .then(game => {
        if (game) {
          res.status(204).end()
        } else {
          res.status(404).json({ message: 'Game not found' })
        }
      })
      .catch(err => res.status(500).json(err))
  }
})

module.exports = server
