const express = require('express');

const server = express();

server.use(express.json())

let games = [
    {
        id:1, 
        title: 'Madden', 
        genre: 'Sports'
    },
    {
        id:2,
        title: 'NBA 2K',
        genre: 'Sports'
    },
    {
        id:3,
        title: 'Dead by Daylight',
        releaseYear: 2017
    }
];

let gameId = 4;

server.get('/games', (req, res) => {
    res.status(200).json(games);
})

server.get('/games/:id', (req, res) => {
    const { id } = req.params;
    const game = games.find(game => game.id == id);
    if (!game) return res.status(404).json({ error: 'Game with the ID provided does not exist!' });
    res.status(200).json(game);
})

server.post('/games', (req, res) => {
    const { title, genre, releaseYear } = req.body;
    const game = { id:gameId, title, genre, releaseYear }
    if (!title || !genre) return res.status(422).json({error:'I need you to fill in the required fields please' });
    for (let i = 0; i < games.length; i++) {
        if(games[i].title.toLowerCase() === title.toLowerCase()) 
        return res.status(405).json({error: 'Game already exists'})
    }
    
    games.push(game)
    gameId++;
    res.status(201).json({game});
})

module.exports = server;