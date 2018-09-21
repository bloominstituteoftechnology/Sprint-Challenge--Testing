const express = require('express');
const server = express();

const gamesArray = [
    {   
        id: 1,
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
    },
    {
        id: 2,
        title: 'Digdug', // required
        genre: 'Arcade', // required
        releaseYear: 1984 // not required
    },
    {
        id: 3,
        title: 'Tetris', // required
        genre: 'Arcade', // required
    }
]

server.use(express.json())

server.get('/' , (req, res) => {
    res.status(200).send('is running');
});

server.get('/games', (req, res) => {
    console.log(gamesArray)
    // const empty = [];
    // if(gamesArray){
        res.status(200).send(gamesArray);
    // } else {
    //     res.status(200).send(empty);
    // }
})

server.post('/games', (req, res) => {
    const {title, genere, releaseYear} = req.body;

    if (!title || !genere) {
        res.status(422).end();
    } else if (!releaseYear) {
        id = gamesArray[gamesArray.length-1].id + 1;
        req.body.id = id;
        gamesArray.push(req.body)
        res.status(200).json(req.body)
    } else {
        res.status(200).json({ title: title, genere: genere, releaseYear: releaseYear })
    }

});

module.exports = server;
//module.export__S__ - wont forget the s again