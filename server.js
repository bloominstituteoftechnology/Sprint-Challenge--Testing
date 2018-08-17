const express = require('express')
const server = express()

server.use(express.json())

server.post('/', (req, res, next) => {
  const { Title, Genre, releaseYear } = req.body
  if (!Title || !Genre || !releaseYear) {
    res.status(400).json({ mes: 'invald request' })
  }
  res.status(201).json({ msg: 'okayy mgame added' })
})

server.delete('/api/delete/:id', (req, res) => {
  const { id } = req.params
  res.status(200).json({ msg: `Game of ${id} deleted.` })
})
module.exports = server
