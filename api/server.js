const express = require('express');
const db = require('../helpers/gameModel.js');
const server = express();
server.use(express.json());



server.get('/games/:id', async (req, res) => {
    const { id } = await req.params;
    if (id) {
        db
            .findById(id)
            .then(game => {
                if (game == '') {
                    return res.status(404).json(game);
                } else {
                    res.json(game);
                }

            })
            .catch(err => {
                res
                    .status(404)
                    .json({ error: "The game id is invalid" });
            });
    }

});

server.delete('/games/:id', (req, res) => {
    const { id } = req.params

    if (id) {
        db.remove(id)
            .then(game => {
                if (game) {
                    res.json({ message: "The game was successfully deleted" });
                } else {
                    res
                        .status(404)
                        .json({ message: "The game with the specified ID does not exist." })
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ error: "The game could not be removed." });
            });
    }
});

server.get('/games', async (req, res) => {
    const gameData = await db.get();
    if (gameData === '') {

        res.status(404).json({});
    } else {

        res.status(200).json(gameData)
    }

});

server.post('/games', async (req, res) => {
    const game = req.body;
    if (game.title && game.genre) {
        const ids = await db.insert(game)
        res.status(201).json(ids);
    } else {
        res.status(422).json({})

    }

});


module.exports = server;
