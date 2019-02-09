const express = require('express');

const server = express();

const games = require('../arcade/arcade')

server.use(express.json());


//Server response get '/'
server.get('/', async (req, res) => {
    res.status(200).json({ response: 'we are ready'})
})

server.get('/games', async (req, res) => {
    const list = await games.getAll();
    res.status(200).json(list);
})

server.post('/games', async (req, res) => {
    const game = req.body;

    if (game.title) {
        games.insert(game)
            .then(response => res.status(201).json(response))
            .catch(err => {
                res.status(405).json({
                    message: "This game already exists"
                })
            })
    }
    else {
        res.status(422).json({error: 'missing title'})
    }
})



module.exports = server;