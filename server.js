const express = require('express');
const knex = require('knex');
const dbConfig = require('./knexfile');
const server = express();
const db = knex(dbConfig.development);

server.use(express.json());

server.get('/', async (req, res) => {
    res.status(200).json({ api: 'up' });
});

server.get('/games', async (req, res) => {
    db('games').then(rows => {
        res.json(rows);
    }).catch(err => {
        res.status(500).json('Err');
    });
})

server.post('/games', async (req, res) => {
    const { title, genre } = req.body;
    if (!title || !genre) {
        res.status(422).json('title and genre are required');
    }
    db('games')
        .where('title', title)
        .then(game => {
            if (game.length) {
                res.status(405).json({ error: "duplicate game" });
            } else {
                db('games').insert({ title, genre })
                    .then(ids => {
                        res.status(201).json(ids);
                    })
            }
        })
        .catch(err => {
            res.status(500).json('Err');
        });
});

module.exports = server;