const express = require('express')

const server = express()

server.use(express.json())


let games = [
  {id:0, title:'Pacman', genre:'Arcade', releaseYear:'1980'},
  {id:1, title:'Street Fighter', genre:'Arcade', releaseYear:'1992'},
  {id:2, title:'Mortal Kombat', genre:'Arcade', releaseYear:'1990'},
  {id:3, title:'Super Mario', genre:'NES', releaseYear:'1986'},
  {id:4, title:'Legend of Zelda', genre:'NES', releaseYear:'1980'},
  
]
server.get('/', (req, res) => {
  res.status(200).send('up and running')
})

server.get('/games', (req, res) => {
  res.status(200).json(games)
})
module.exports = server