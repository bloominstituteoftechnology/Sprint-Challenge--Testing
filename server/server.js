const express = require('express')

const server = express()

const dummyGameData = [
  // {
  //   title: 'Pacman', 
  //   genre: 'Arcade', 
  //   releaseYear: 1980 
  // }
]

server.use(express.json())

server.post('/games', (req, res) => {
  const game = req.body
  
  if (!game.title || !game.genre) {
    res.status(422).json({ message: 'Title and genre are required'})
  }

  res.status(201).json({ message: 'Successfully posted a game' })
})

server.get('/games', (req, res) => {
  res.status(200).json(dummyGameData)
})

const port = 9998
server.listen(port, () => { console.log(`Server is now running on port ${port}`) })

module.exports = server