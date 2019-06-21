const express = require('express');
const router = express.Router();

const Games = require('./gamesModel');

router.get('/', async (req, res) => {
    Games.get()
    .then(games => {
        res.status(200).json(games)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.post('/', (req, res) => {
    Games.insert(req.body, 'id')
    .then(game => {
        res.status(201).json(game)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

module.exports = router;