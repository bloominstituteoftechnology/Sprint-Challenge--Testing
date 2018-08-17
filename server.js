const express = require('express');
const server = express();

server.use(express.json());

const games = [{
    title: 'Pacman',
    genre: 'Arcade',
    releaseYear: 1980
}]


server.get('/games', (req, res) => {
    res.status(200).send(games)
})

server.post('/games', (req, res) => {
    const newGame = req.body;
    if(!newGame.title || !newGame.genre || !newGame.releaseYear){
        res.status(422).json({error: 'all fields are required'})
    }
    games.push({
        title: newGame.title,
        genre: newGame.genre,
        releaseYear: newGame.releaseYear
    })
    res.status(200).json({title: newGame.title, genre: newGame.genre, releaseYear: newGame.releaseYear})
    
})
module.exports = server;