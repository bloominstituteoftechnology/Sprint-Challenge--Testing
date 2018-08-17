const express = require('express');

const server = express();

server.use(express.json());

let games = [{
    title: 'Mario',
    genre: 'platformer',
    releaseYear: 1990
}]

server.get('/', (req, res) => {
    res.status(200).json(games)
})

server.post('/', (req, res) => {
    let game = req.body;
    try {
        if (!game.title || !game.genre) { throw new Error('Please fill out title and genre') }
        else {
            games.push(game);
            res.status(200).json(game)
        }
    }
    catch (err) {
        res.send(500).json({ message: err.message })
    }

})

module.exports = server;
