const express = require('express');
const helmet = require('helmet');

const db = require('./data/dbConfig');
const gamesDb = require('./data/gamesModel');

const server = express();
server.use(express.json());
server.use(helmet());


// API Status at root
server.get('/', (req, res) => res.send({API: 'live'}))

function dupeCheck(req, res, next) {
    const {title} = req.body;

}

// POST endpoint
server.post('/api/games', async (req, res) => {
    const {title, genre} = req.body;
    try {
        if (!title || !genre) { // if data missing, return status 422
            res.status(422).json({message: "Please fill out all fields"});
        } else { // check if duplicate
            let response = await gamesDb.insert(req.body)
            res.status(201).json(response)
        }
    } catch (err) { // if error, return status 500
        res.status(500).json(err)
    }
})

// GET endpoint
server.get('/api/games', async (req, res) => {
    try {
        const games = await gamesDb.getAll();
        res.status(200).json(games)
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET by id endpoint 
server.get('/api/games/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const game = await gamesDb.getById(id);
        if (!game) {
            res.status(404).json({message: "Nonexistent game"})
        } else {
            res.status(200).json(game)
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

// DELETE endpoint
server.delete('/api/games/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const game = await gamesDb.getById(id);
        if (!game) {
            res.status(404).json({message: "Nonexistent game"})
        } else {
            const removal = await gamesDb.remove(id);
            res.status(200).json(removal)
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = server;