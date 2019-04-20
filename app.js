//app.js
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Game = require('./data/Games')

const game = new Game()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.status(200).json(game.get())
})

app.post('/', (req, res) => {
  const { title, genre, releaseYear } = req.body

  if (!title || !genre) {
    return res.status(422).send('Missing data')
  }

  const response = game.insert(req.body)

  if (response[0] === 500) {
    return res.status(500).json(response)
  }

  res.status(200).json(game.insert(req.body))
})

module.exports = app