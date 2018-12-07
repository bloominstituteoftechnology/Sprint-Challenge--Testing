const express = require('express');
const knex = require('knex');

const games = require('../games.js');

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ message: 'api: up' });
})

server.get('/games', (req, res) => {
    games
        .getGames()
        .then(game => {
            res.status(200).json(game);
        }).catch(error => {
            res.status(500).json({ error: 'Cannot find the game' });
        });
})

server.post('/addGame', (req, res) => {
    const { title, genre, releaseYear } = req.body;
    const game = { title, genre, releaseYear };

    if(!game){
        return res.status(400).sendDate({ Message: 'Please provide a Title, Genre, and a ReleaseYear.' });
    }
    games
        .addGame(game)
        .then(ids => {
            res.status(201).json({ Game: `${game.title} ${game.genre} ${game.releaseYear}` });
        })
        .catch(error => {
            res.status(422).json({ error: 'Cannot add a new game.' });
        });
})

module.exports = server;