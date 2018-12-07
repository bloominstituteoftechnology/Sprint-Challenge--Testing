const express = require('express')

const server = express()

server.use(express.json())

let games = []

server.post('/games', (req, res) => {
  const { title, genre, releaseYear } = req.body

  if (!title || !genre) {
    res.status(422).send()
  }

  const gamesTotal = games.length

  if (releaseYear) {
    games.push({ title, genre, releaseYear })
  } else {
    games.push({ title, genre })
  }

  if (games.length > gamesTotal) {
    res.status(201).send()
  } else {
    res.status(500).send()
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
