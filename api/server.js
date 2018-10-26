const express = require('express');

const server = express();

server.use(express.json());

// DATABASE
let gamesDb = [];

server.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is up!' });
});

server.get('/games', (req, res) => {
    if (gamesDb.length <= 0) {
        gamesDb = [
            {
                id: 0,
                title: 'Pacman', // required
                genre: 'Arcade', // required
                releaseYear: 1980 // not required
            },
            {
                id: 1,
                title: 'Rocket Knight Adventures', // required
                genre: 'Platformer', // required
                releaseYear: 1993 // not required
            },
            {
                id: 2,
                title: 'Metal Slug', // required
                genre: 'Platformer', // required
                releaseYear: 1996 // not required
            },
            {
                id: 3,
                title: 'Sonic R', // required
                genre: 'Racing', // required
                releaseYear: 1997 // not required
            }
            
        ];

        return res.status(200).json({ data: [] });
    }

    res.status(200).json({ data: gamesDb });
});

server.get('/games/:id', (req, res) => {
    const { id } = req.params;

    let game = gamesDb.filter(el => el.id === Number(id));
    if(!game || game.length <= 0) res.status(404).json({message: 'Game not found'});
    res.status(200).json({ data: game });
});

server.post('/games', (req, res) => {
    const { game } = req.body;

    if(!game.title || !game.genre) return res.status(422).json({ message: 'Must have a title and genre'});
    
    gamesDb.forEach( el => {
        if(el.title === game.title) return res.status(405).json({ message: 'Title must not be the same'});
    })

    let count = gamesDb.length;
    const newGame = {
        id: count,
        ...game
    }

    gamesDb.push(newGame);
    res.status(201).json({ data: gamesDb });
});

module.exports = server;