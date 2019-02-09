const express = require('express');
const server = express();
const knex = require('knex');
const dbconfig = require('./knexfile');
const db = knex(dbconfig.development);

server.use(express.json());

server.post('/games', async (req, res) => {
    const game = req.body;
    if (game.title && game.genre) {
        const posted = await db('games').insert(game);
        res.status(201).json(posted);
    } else {
        res.status(422).json({ message: 'need a name and/or genre' })
    }

});

server.get('/games', (req, res) => {
    db('games')
        .then(games => res.status(200).json(games))
        .catch(err => { res.status(500).json({ message: 'Unable to find games:', err }) })
});

server.delete('/games/:id', (req, res) => {
    const { id } = req.params;
    db('games').where('id', id).del()
        .then((count) => {
            if (count) {
                res
                    .status(201)
                    .json(count);
            } else {
                res
                    .status(404)
                    .json({ message: "Unable to delete game" })
            }
        }).catch(error => {
            res
                .status(500)
                .json({ error })
        })
});

server.get('/games/:id', (req, res) => {
    const { id } = req.params;
    db('games').where('id', id)
        .then(game => {
            if (game.length) {
                res
                    .status(200)
                    .json(game);
            } else {
                res
                    .status(404)
                    .json({
                        error: "The game with the specified ID does not exist."
                    })
            }
        })
        .catch(error => {
            res
                .status(500)
                .json({ error })
        })
})

module.exports = server;