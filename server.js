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

const getId = (req,res,next) => {
    const highestId = games.reduce((acc, object) => {
            acc = object.id > acc ? object.id : acc
            return acc
        }, 0)

    req.nextId = highestId + 1

    next()
}

server.get('/', (req,res) => {
    res.status(200).json({ message : "App running" })
})

server.get('/games', (req, res) => {
    res.status(200).json(games)
})

server.post('/games', getId, (req,res) => {
    try{
        const { title, genre, releaseYear } = req.body

        if(!title || !genre){
            res.status(422).json({ message: "Please include a valid title and genre" })
        }
    
        const newGame = {
            id: req.nextId,
            title: title,
            genre: genre,
            releaseYear: releaseYear ? releaseYear : "unknown"
        }
        games.push(newGame)

        res.status(200).json(newGame)
    }catch(err){
        res.status(500).json({message: "Error adding game"})
    }
})

module.exports = server