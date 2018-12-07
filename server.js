const express = require('express')
const server = express()
const db = require('./data/dbConfig.js')
server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({ message: 'im working' })
}) 

server.get('/games', (req, res) => {

    db('games')
        .then(games => {
            res.status(200).json(games)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })

})

server.post('/games', (req, res) => {
    const game = req.body

    if(!game.title || !game.genre) {
        res.status(422).json({ message: 'Please provide title and genre' })
    } else {
        db('games')
            .insert(game)
            .then(id => {
                res.status(201).json(id)
            })
            .catch(err => {
                res.status(500).json({ error: err })
            })
    }
})

module.exports = server;