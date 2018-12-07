const express = require('express');

const server = express();

server.use(express.json());

server.post('/games', (req, res) => {
    const { title, genre } = req.body;
    if (!title || !genre) {
        res.status(422).json({ message: 'please add title and genre' })
    } else {
        res.status(200).json(req.body);
    }
});

server.get('/games', (req, res) => {
    Object.keys(req.body).length ? res.status(200).json([req.body]) : res.status(200).json([]);
});

// sanity check endpoint
server.get('/', (req, res) => {
  res.status(200).json({ api: 'alive' });
});

module.exports = server;