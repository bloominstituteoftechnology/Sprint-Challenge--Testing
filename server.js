const express = require('express');
const server = express();

server.use(express.json());

const games = [{
    title: 'Pacman',
    genre: 'Arcade',
    releaseYear: 1980,
    id: 1
}]

const id = 2

server.get('/games', (req, res) => {
    res.status(200).send(games)
})

server.post('/games', (req, res) => {
    const newGame = req.body;
    if(!newGame.title || !newGame.genre || !newGame.releaseYear){
        res.status(422).json({error: 'all fields are required'})
    }
    games.forEach(el => {
        if(el.title === newGame.title) {
            res.status(405).json({error: 'That title is already in the database'})
        }
    })

    games.push({
        title: newGame.title,
        genre: newGame.genre,
        releaseYear: newGame.releaseYear,
        id: id
    })
    res.status(200).json({title: newGame.title, genre: newGame.genre, releaseYear: newGame.releaseYear})
    id++
})

server.get('/games/:id', (req, res) => {
    const id = req.params.id
    const {title, genre, releaseYear} = req.body
    const findById = game => {
        return game.id === Number(id);
    }
    const foundGame = games.find(findById);
    if(!foundGame) {
        res.status(404).json({error: 'The game with the specified id does not exist'})
    } else {
        if (title) foundGame.title = title;
        if (genre) foundGame.genre = genre;
        if (releaseYear) foundGame.releaseYear = releaseYear;
    }
    res.status(200).json(foundGame)
})

server.delete('/games/:id', (req, res) => {
    const id = req.params.id;
    const findById = game => {
        return game.id === Number(id);
    }
    const foundGame = games.find(findById);
    if(!foundGame) {
        res.status(404).json({error: 'The game with the specified id does not exist'})
    } else {
        res.status(200). json({deleted: foundGame})
    }
})

module.exports = server;