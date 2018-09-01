const express = require('express');
const server = express();
server.use(express.json());

let games = [
              { id: 1,
                title: 'Pacman',
                genre: 'Arcade',
                releaseYear: 1980
              }
            ];

server.post('/games', (req, res) => {
  if (!req.body.title || !req.body.genre || !req.body.releaseYear) {
    return res.status(422).json();
  }
  req.body.id = games[games.length - 1].id + 1;
  return res.status(201).json(req.body);
});

server.get('/games', (req, res) => {
  return res.status(200).json(games);
});

server.get('/games/:id', (req, res) => {
  const { id } = req.params;
  const game = games.find(x => x.id === Number(id));
  if (game === undefined) {
    return res.status(404).json();
  }
  return res.status(200).json(game);
});

module.exports = server;
