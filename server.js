const express = require('express');
const server = express();

server.use(express.json());

const games = [{title: "Pacman", genre: "Arcade",  releaseYear: 1980}, {title: "Minecraft", genre: "Sandbox", releaseYear: 2009}, {title: "World of Warcraft", genre: "Role-playing", releaseYear: 2004}]

server.get('/games', (req, res) => {
        res.status(200).json({games});
})

server.post('/games', (req, res) => {
        const { title, genre, releaseYear } = req.body;
        if (!title || !genre || !releaseYear) {
            res.status(422).json({ msg: 'Make sure you add a title, a genre, and a release year.'})
        }
        res.status(201).json({ title, genre, releaseYear });
})

server.get('/games/:id', (req, res) => {
    
})

server.delete('/games/:id', (req, res) => {
    
})

module.exports = server;