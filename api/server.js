const express = require('express');

const server = express();

server.use(express.json());

let games = [
    {
        title: 'Not Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
    },
    {
        title: 'Not Not Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
    },
    {
        title: 'Not Not Not Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
    }
];

server.get('/', (req, res) => {
    res.status(200).json({server: 'is up'})
})

server.get('/games', (req, res) => {
    res.status(200).json(games);
})

server.post('/games', (req, res) => {
    if (!req.body.title || !req.body.genre) {
        res.status(422).json({error: 'title and genre must be provided'})
        return;
    }

    const gameTitles = games.map(game => game.title);

    if(gameTitles.indexOf(req.body.title) !== -1) {
        res.status(405).json({error: 'title already exists'})
        return;
    }

    games.push(req.body);
    const index = games.length - 1;
    res.status(201).json({index});
})


server.delete('/games/:id', (req, res) => {
    const id = req.params.id
    if (games.length <= id) {
        res.status(404).json({error: 'game does not exist'})
        return;
    }

    let copy = [...games];
    copy.splice(id, 1);
    games = copy;
    
    res.status(200).json({deleted: 'game'});
})

server.get('/games/:id', (req, res) => {
    const id = req.params.id
    if (games.length <= id) {
        res.status(404).json({error: 'game does not exist'})
        return;
    }
    
    res.status(200).json(games[id]);
})




module.exports = server;