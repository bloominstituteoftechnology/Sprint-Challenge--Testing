const express = require('express')

const server = express()

server.use(express.json())

const games = [
  {
    title: 'Life',
    genre: 'General',
    releaseYear: '200k bc'
  }
]

const addGame = ({ title, genre, releaseYear }) => {
  const titleCollision = !!games.find(game => game.title === title)

  if (titleCollision) {
    throw new Error('Title collsion. Titles must be unique.')
  }

  if (releaseYear) {
    games.push({ title, genre, releaseYear })
  } else {
    games.push({ title, genre })
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
      res.send(422).send()
    }
  }
})

server.get('/games', (req, res) => {
  res.status(200).json(games)
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
