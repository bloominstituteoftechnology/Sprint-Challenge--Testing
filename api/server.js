const express = require('express');;

const server = express();

server.use(express.json());

let games = [];
let gameId = 1 ;

//sanity check
server.get('/', (req, res) => {
  res.status(200).json({ message: 'it\'s ALIVE!' })
})

server.get('/games', (req, res) => {
  res.status(200).json(games);
});

server.post('/games', (req, res) => {
  const { title, genre, releaseYear } = req.body;
  const newGame = { title, genre, releaseYear, id:gameId };
  if (!title || !genre) {
    return res.status(422).json({ error: 'title and genre are required' });
  }
  const findGameByTitle = game => {
    return game.title === title;
  };
  if (games.find(findGameByTitle)) {
    return res.status(405).json({ error: 'That title already exists!' })
  }
  games.push(newGame);
  gameId++;
  res.status(201).json(games);
})



module.exports = server;
