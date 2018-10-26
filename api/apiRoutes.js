const express = require('express');
const helmet = require('helmet');

const server = express();

const db = require('./apiModel');

server.use(express.json());
server.use(helmet());

server.get('/api', (req, res) => {
    res.status(200).json({ message: 'server is up' });
});

server.get('/api/games', (req, res) => {
    db
        .find()
        .then(games => {
            res.status(200).json(games);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.get('/api/games/:id', (req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then(game => {
            if (!game) {
                res.status(404).json({ error: "Could not find" });
            }
            res.status(200).json(game);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.post('/api/games', (req, res) => {
    const game = req.body;

    db
        .add(game)
        .then(ids => {
            if (!game.title || !game.genre) {
                res.status(400).json({ error: "Please provide more information" });
            }
            res.status(201).json(ids[0]);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.put('/api/games/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db
        .update(id, changes)
        .then(count => {
            if (!count || count < 1) {
                res.status(404).json({ message: "Could not update" });
            } else {
                res.status(200).json(count);
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.delete('/api/games/:id', (req, res) => {
    const { id } = req.params;

    db
        .remove(id)
        .then(count => {
            if (!count || count < 1) {
                res.status(404).json({ message: "Could not remove" });
            } else {
                res.status(200).json(count);
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = server;