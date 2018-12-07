const express = require('express');
const server = express();
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running'});
});

server.get('/api/games', (req, res) => {
    db('games')
    .select('title', 'genre', 'releaseYear')
    .then(games => {
        res.status(200).json(games);
    })
    .catch(err => {
        res.status(400).json({message: 'error retrieving games'});
    })
})



module.exports = server;