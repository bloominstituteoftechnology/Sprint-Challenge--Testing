const express = require('express')
const db = require('./data/dbConfig.js')


// initialize server
const server = express()

// Middleware
server.use(express.json())


// Endpoints

// POST call, add a new game to the database.

server.post('/api/games', (req, res) => {
    const gameData = req.body
if (!gameData.title || !gameData.genre || !gameData.releaseYear) {
    res.status(422).json({message: 'Please include a title, genre and release year to add a new game.'})
}
    db('games')
    .insert(gameData)
    .then(ids => {
        res.status(200).json(ids)
    })
    .catch(err => res.status(500).json({error: `Error: ${err}`}))
})

// GET call, access all games from database.

server.get('/api/games/info', (req, res) => {
    db('games')
    .then(games => {
        res.status(200).json(games)
    })
    .catch(err => res.status(500).json({error: `Error: ${err}`}))
})




// Sanity Check
server.get('/', (req, res) => {
    res.json({api: 'alive'})
})


module.exports = server