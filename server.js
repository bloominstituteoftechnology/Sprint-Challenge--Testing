const express = require('express');

const server = express();

server.use(express.json());



server.get('/', (req, res) => {
    res.status(200).json({ path: 'exists'})
})

server.get('/games', (req, res) => {
    const games = [{
        title: 'Pacman',
        genre: 'Arcade'
    }, {
        title: 'Street Fighter V',
        genre: 'Fighting'
    }, {
        title: 'Tales of the Abyss',
        genre: 'RPG'
    }, {
        title: 'Super Mario 64',
        genre: 'Adventure'
    }, {
        title: 'Zelda : Link to the Past',
        genre: 'RPG/Adventure'
    }]

    res.status(200).json(games)
})

server.post('/games', (req, res) => {
    const { title, genre } = req.body
    res,status(200).json({ title: `${title}`, genre: `${genre}`})
})

module.exports = server;