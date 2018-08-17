const express = require('express')

const server = express()

server.use(express.json())

let games = [
    {
        id: 1,
        title: 'Pacman', 
        genre: 'Arcade', 
        releaseYear: 1980 
    },
    {
        id: 2,
        title: 'Galaga', 
        genre: 'Arcade', 
        releaseYear: 1982
    }
]

server.get('/', (req,res) => {
    res.status(200).json({ message : "App running" })
})

server.get('/games', (req, res) => {
    res.status(200).json(games)
})


module.exports = server