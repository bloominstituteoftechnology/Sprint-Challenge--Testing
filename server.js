const express = require('express')

let games = [
  {
    title: 'Pacman',
    genre: 'Arcade',
    releaseYear: '1980'
  },
  {
    title: 'Galaga',
    genre: 'Arcade',
    releaseYear: '1983'
  },
  {
    title: 'Super Mario',
    genre: 'Arcade',
    releaseYear: '1987'
  }
]

updateGamesList = (list) => {
  let newList = list;
  games = newList;
}

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
  res.status(200).json({ games: {games} })
})

server.post('/', (req, res) => {
  const { title, genre, releaseYear } = req.body
  let game = {
    title: title,
    genre: genre,
    releaseYear: releaseYear
  }

  if (!game.title || !game.genre) {
    res.status(422).send('please include a name and genre for the game')
  }
  games.push(game);
  res.status(200).json({ added: game })
})

server.delete('/', (req, res) => {
  const { title } = req.body
  const newGames = []
  games.forEach(game => {
    if( game.title !== title ) {
      newGames.push(game)
    }
  })
  updateGamesList(newGames)
  res.status(200).json({ removed: title })
})



module.exports = server;
