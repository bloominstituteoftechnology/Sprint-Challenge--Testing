// intialize route
const express = require('express');
const router = express.Router();
const db = require('../helpers/models/gamesModel.js');

// CRUD logic

// Create/Post logic
router.post('/', (req, res) => {
    const game = req.body;
    const { genre, title } = game;
    
    if (title && genre) {
        db
            .add(game)
            .then(newGame => {
                    res
                    .status(201)
                    .json(newGame)
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ err: 'Failed to insert game!'})
            });
    } else if (!title) {
        res
            .status(422)
            .json({ err: 'Bad request (check title)'});
    } else if (!genre) {
        res
            .status(422)
            .json({ err: 'Bad request (check genre)'});
    } else {
        res
            .status(500)
            .json({ err: 'Failed to add game'})
    }
});

// Read/get logic

router.get('/', (req, res) => {
    db
        .find()
        .then(games => {
            res
            .status(200)
            .json(games);
        })
        .catch(err => {
            res
                .status(500)
                .json({ err: 'Could not retrieve games from database' });
        });
}); 

module.exports = router;