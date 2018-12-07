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

// [POST] /games
router.post('', (req, res) => {
    const game = req.body;
    gamesDb.addGame(game)
        .then(id => {
            res.status(201).json(id);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;