const express = require('express');
const server = express();

server.use(express.json());

let games = [
  {
      id: 1,
      title: 'Mario Kart Wii',
      genre: 'Racing'
  },
  {
      id: 2,
      title: 'Tetris Attack',
      genre: 'Puzzle'
  },
  {
      id: 3,
      title: 'Kirby Super Star',
      genre: 'Action',
      releaseYear: 2017
  }
];

server.post('/games', (req, res) => {
  const { title, genre, releaseYear } = req.body;
  const game = { id: gameId, title, genre, releaseYear };

  if(!title || !genre) {
    return res.status(422).json({ error: 'Missing title and/or genre.'})
  }

  for (let i = 0; i < games.length; i++) {
    if(games[i].title.toLowerCase() === title.toLowerCase()) return res.status(422).send({ error: 'Duplicate entry.'})
  }

  games.push(game);
  gameId++;

  res.status(201).json({game});

});
  
server.get('/games', (req, res) => {
  res.status(200).json({games});
})

server.get('/games/:id', (req, res) => {
  const { id } = req. params;
  const game = games.find(game => game.id == id);
  if (!game) {
    return res.status(404).json({error: 'Game with the provided ID does not exist.' }) 
  }
  res.status(200).json({game});
})


module.exports = server;