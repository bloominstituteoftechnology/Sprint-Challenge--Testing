const express = require('express');
// const server = require('./server.js')
const server = express();
server.use(express.json())
port = process.env.PORT || 5000

idIncrement = (array) => {
  let lastItem = array[array.length - 1]
  return lastItem.id + 1
}

// const newGame = {name: "Dig Dug", genre: "Arcade", releaseYear: 1980}
let data = [ {id: 1, name: "Pac-Man", genre: "Arcade", releaseYear: 1980},
  {id: 2, name: "Super Mario Bros", genre: "Platform", releaseYear: 1984},
  {id: 3, name: "Final Fantasy", genre: "RPG", releaseYear: null},
]
const game = data.filter(item => item.id === 1)
  console.log(game)
// data = [...data, {...newGame, id: idIncrement(data)} ]

// console.log({...newGame, id: idIncrement(data)})

server.get('/', (req, res) => {
  res.status(200).json('hello')
})


server.get('/api/games', (req, res)=> {
  res.status(200).json(data)
})


server.get('/api/games/:id', (req, res)=> {
  const game = data.filter(item => item.id === params.id)
  res.status(200).json(game)
  // res.status(200).json({id: 1, name: "Pac-Man", genre: "Arcade", releaseYear: 1980})

})


server.post('/api/games', (req, res) => {
  const {name, genre} = req.body
    if(name.length >= 1 && genre.length >= 1) {
      let newGame = req.body
      newGame = {...newGame, id: idIncrement(data)}
      data = [...data, newGame]
      res.status(201).json(newGame.id)
    } else {
      res.status(422).json({message: "Name and genre can't be blank"})
    }

})


module.exports = server;
// server.listen(port, ()=>{console.log(`\n Server Listening on ${port}\n`)})
