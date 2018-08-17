const express = require('express');
const server = express();

server.use(express.json());

const games = [{title: "Pacman", genre: "Arcade",  releaseYear: 1980, id: 1}, {title: "Minecraft", genre: "Sandbox", releaseYear: 2009, id: 2}, {title: "World of Warcraft", genre: "Role-playing", releaseYear: 2004, id: 3}]

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
    // const {title, genre, releaseYear, id} = req.body
    // if (!id) {
    //     res.status(404).json({ msg: `The game with id #${id} does not exist.` }) 
    // }
    // res.status(200).json({ title, genre, releaseYear })
})

server.delete('/games/:id', (req, res) => {
        const {id} = req.params;
        if (!id) {
            res.status(404).json({ msg: `The game with id #${id} does not exist.` }) 
        }
        res.status(200).json({ msg: `The game with id #${id} is deleted.` })
})

server.put("/games/:id", (req, res) => {
    const { title, genre, releaseYear, id } = req.body;
    if (!title || !genre || !releaseYear || !id) {
      res.status(400).json({ error: "Make sure title, genre and release year are filled in." });
    }
    res.status(200).json({ title: title, genre: genre, releaseYear: releaseYear, id: id });
  });

module.exports = server;