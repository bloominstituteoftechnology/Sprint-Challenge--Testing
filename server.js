const express = require('express');
const server = express();

server.use(express.json());

let games = [
    { id: 1, title: 'Fortnite', genre: 'Battle Royale', releaseYear: 2017 },
    { id: 2, title: 'Fifa 19', genre: 'Sports', releaseYear: 2018 }
];

server.get('/games', (req, res) => {
    res.status(200).json(games);
});

server.post('/games', (req, res) => {
   const game = req.body;
   if (game.title && game.genre) {
     let id = games.length + 1;
     game.id = id;
     games.push(game);
     res.status(201).json(games);
    } else {
     res
       .status(422)
       .json({ message: 'Please enter title and genre.' });
    }
});
module.exports = server;