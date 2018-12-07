const express = require('express');
const gamesDb = require('../data/helpers/gamesHelpers.js');

const router = express.Router();

// [GET] /games
router.get('', (req, res) => {
    gamesDb.getGames()
        .then(games => {
            res.status(200).json(games);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// [GET] /games/:id
router.get('/:id', (req, res) => {
    gamesDb.getGame(req.params.id)
        .then(game => {
            if (game.length) {
                res.status(200).json(game);
            } else {
                res.status(404).json({ message: 'Id does not exist' })
            };
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// [POST] /games
router.post('', (req, res) => {
    const game = req.body;
    if (game.title && game.genre) {
        gamesDb.addGame(game)
            .then(id => {
                res.status(201).json(id);
            })
            .catch(err => {
                if (err.code === 'SQLITE_CONSTRAINT') {
                    res.status(405).json({ err, errorMessage: 'Game already in database' })
                } else {
                    res.status(500).json({ error: err, errorMessage: 'Error adding game' });
                }
            });
    } else {
        res.status(422).json({ message: 'Invalid input' });
    }
});

// [DELETE] /games/:id
router.delete('/:id', (req, res) => {
    gamesDb.removeGame(req.params.id)
        .then(recordsDeleted => {
            if (recordsDeleted) {
                res.status(200).json(recordsDeleted);
            } else {
                res.status(404).json({ message: 'Id does not exist' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;