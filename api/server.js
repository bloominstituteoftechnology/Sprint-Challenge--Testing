const express = require('express');
const db = require('../helpers/gameModel.js');
const server = express();
server.use(express.json());

server.get('/', async (req, res) => {
    res.status(200).json({ api: 'up' });
});

server.get('/games', async (req, res) => {
    const gameData = await games.getAll();
    if (gameData === '') {
        res.status(200).json({});
    }else {
        res.status(200).json(gameData)
    }    
   // res.status(200).json(gameData);
});

server.post('/games', async (req, res) => {
    const game = req.body;
    if (game.title && game.genre) {
        const ids = await db.insert(game)
        res.status(201).json(ids);
    } else {
        res.status(422).json({})

    }
   // res.status(200).json();
});


/* server.delete('/:id', (req, res) => {
    const { id } = req.params

    if (id) {
        projects.remove(id)
            .then(project => {
                if (project) {
                    res.json({ message: "The project was successfully deleted" });
                } else {
                    res
                        .status(404)
                        .json({ message: "The project with the specified ID does not exist." })
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ error: "The project could not be removed." });
            });
    }
}); */


module.exports = server;
