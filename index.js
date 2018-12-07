const express = require('express');
// const server = require('./server.js')
const server = express();
port = process.env.PORT || 5000

let data = [
  {name: "Pac-Man", genre: "Arcade", releaseYear: 1980},
  {name: "Super Mario Bros", genre: "Platform", releaseYear: 1984},
  {name: "Final Fantasy", genre: "RPG", releaseYear: null},
]

server.get('/', (req, res) => {
  res.status(200).json('hello')
})

server.get('/api/games', (req, res)=> {
  res.status(200).json(data)
})


module.exports = server;
// server.listen(port, ()=>{console.log(`\n Server Listening on ${port}\n`)})
