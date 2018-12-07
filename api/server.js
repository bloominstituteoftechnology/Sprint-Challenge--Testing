const express = require('express')

const server = express()

server.use(express.json())

let nextId = 0
// with postfix operator function returns value then increments it
const idCounter = () => nextId++

const games = [
  {
    id: idCounter(),
    title: 'Life',
    genre: 'General',
    releaseYear: '200k bc'
  }
]

const addGame = ({ title, genre, releaseYear }) => {
  // check for title collision
  const titleCollision = !!games.find(game => game.title === title)

  if (titleCollision) {
    throw new Error('Title collsion. Titles must be unique.')
  }

  // add game to data
  if (releaseYear) {
    games.push({ id: idCounter(), title, genre, releaseYear })
  } else {
    games.push({ id: idCounter(), title, genre })
  }
}

server.post('/games', (req, res) => {
  const { title, genre, releaseYear } = req.body

  if (!(title && genre)) {
    res.status(422).send()
  } else {
    try {
      const gamesTotal = games.length
      addGame({ title, genre, releaseYear })

      if (games.length > gamesTotal) {
        res.status(201).send()
      } else {
        res.status(500).send()
      }
    } catch (error) {
      res.send(405).send()
    }
  }
})

server.get('/games', (req, res) => {
  res.status(200).json(games)
})

server.get('/games/:id', (req, res) => {
  const { id } = req.params
  // loosy equals below because we're comparing ie 0 and '0'
  const game = games.find(game => game.id == id)

  if (game) {
    res.send(200).json(game)
  } else {
    res.send(404).send()
  }
})

// server.delete('/games', (req, res) => {
//   const { item } = req.body

//   if (item) {
//     games = [...games.filter(x => x !== item)]
//     res.status(200).send()
//   } else {
//     res.status(400).send()
//   }
// })

module.exports = server
