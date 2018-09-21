const express = require('express')
const server = express()

const gamesArray = [
    {
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
    },
    {
        title: 'Digdug', // required
        genre: 'Arcade', // required
        releaseYear: 1984 // not required
    },
    {
        title: 'Tetris', // required
        genre: 'Arcade', // required
    }
]

server.use(express.json())

server.get('/' , (req, res) => {
    res.status(200).send('is running');
});

server.get('/games', (req, res) => {
    if(gamesArray.length === 0 ){
        res.status(200).send(gamesArray);
    } else {
        res.status(200).send(gamesArray);
    }
})

server.post('/games', (req, res) => {
    const {title, genere, releaseYear} = req.body;
    if (!title || !genere) {
        res.status(422).end()
    } else if (!releaseYear) {
        res.status(200).json({ title: title, genere: genere })
    } else {
        res.status(200).json({ title: title, genere: genere, releaseYear: releaseYear })
    }
})

module.exports = server;
//module.export__S__ - wont forget the s again