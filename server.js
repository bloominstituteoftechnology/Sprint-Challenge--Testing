const express = require('express');
const server = express();

server.use(express.json());

let count = 3;
const games = [
    {
        title:'Defense Of The Ancients - DOTA',
        genre: 'Action Real Time Strategy',
        id: 1
    },
    {
        title:'Kingdom Hearts',
        genre: 'Action/RPG',
        id: 2
    },
    {
        title:'Ragnarok: Eternal Love',
        genre: 'Massive Multiplayer Online Role Playing Game',
        id: 3
    },
];


server.get('/', (req, res) => {
    res.send('<h1>Sanity Check!</h1>');
});

server.get('/games', (req, res) => {
    res.json(games);
});

server.get('/games/:id', (req, res) => {
    const id = req.params.id;
    const selectGame = games.find(game => game.id == id);

    if (selectGame) {
        res.status(200).json(games);
    } else {
        res.status(404).json({message: 'contents not found'});
    }
});

server.post('/games', (req, res) => {
const { title } = req.body;
  const newGame = { title, id: count };
  if (!title) {
    res.status(401).json({ message: 'Insert title field' });
  }

  games.push(newGame);
  count++;
  res.status(201).json(games);
});



module.exports = server;