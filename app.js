const express = require("express");
const games = require('./db');

const app = express();
app.use(express.json());

const port = 9000;
app.listen(port, function () {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

app.get('/games', (req, res) => {
    res.status(200).send(games);
});

app.post('/games', (req, res) => {
    if (!req.body.title) {
        return res.status(422).send({
            message: 'title is required'
        });
    } else if (!req.body.genre) {
        return res.status(422).send({
            message: 'genre is required'
        });
    }
    const game = {
        title: req.body.title,
        genre: req.body.genre,
        releaseYear: req.body.releaseYear
    }
    games.push(game);
    return res.status(201).send({
        message: 'game added successfully',
        games
    });
});

module.exports = app;