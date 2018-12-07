const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.post('/games', (req, res) => {
    const { title, genre } = req.body;
    db('games')
    .insert({ title, genre })
    .then(body => {
        res.status(200).json(req.body);
    })
    .catch(err => {
        res.status(422).json({ message: 'please add title and genre', err })
    });

    // old endpoint code
    // if (!title || !genre) {
    //         res.status(422).json({ message: 'please add title and genre', err })
    //     } else {
    //         res.status(200).json(body);
    //     }
});

server.get('/games', (req, res) => {
    db('games')
    .select('title', 'genre', 'releaseYear')
    .then(games => {
        res.status(200).json(games)
    })
    .catch(err => {
        res.json(err);
    })
    // old endpoint code
    //Object.keys(req.body).length ? res.status(200).json([req.body]) : res.status(200).json([]);
});

// sanity check endpoint
server.get('/', (req, res) => {
  res.status(200).json({ api: 'alive' });
});

module.exports = server;