const express = require('express');

const server = express();

server.use(express.json());


let games = [
    { 
        id: 1,
        title: 'Pacman', 
        genre: 'Arcade', 
        releaseYear: 1980
    },
    {
        id: 2,
        title: 'Super Mario', 
        genre: 'Platformer', 
        releaseYear: 1985 
    }
  ];

server.get('/games', (req, res) => {
    res.status(200).json(games);
});

server.post('/games', (req, res) => {
    const game = req.body;
    if (game.title && game.genre) {
        if (games.find(existingGame => existingGame.title === game.title)) {
            res.status(405).json({ message: 'Duplicate title, please enter another game' });
        } else {
            let id = games.length + 1;
            game.id = id;
            games.push(game);
            res.status(201).json(games);
          }
    } else {
        res
        .status(422)
        .json({ message: 'Title and genre required' });
    }
});

module.exports = server;