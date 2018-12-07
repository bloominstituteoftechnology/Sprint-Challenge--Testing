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

module.exports = server;