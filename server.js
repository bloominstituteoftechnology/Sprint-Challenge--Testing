const express = require('express');

const server = express();

// middleware
server.use(express.json());

// make some test data
const games = [
    {id: 1, title: 'Minecraft', genre: 'Sandbox', releaseYear: 2009},
    {id: 2, title: 'Fortnite', genre: 'Battle Royale', releaseYear: 2017},
    {id: 3, title: 'StarCraft II', genre: 'RTS', releaseYear: 2010},
    {id: 4, title: 'World of Warcraft', genre: 'MMORPG', releaseYear: 2004},
    {id: 5, title: 'Cuphead', genre: 'Shoot \'em up', releaseYear: 2017}
]

// endpoints
server.post('/games', (req, res) => {
    const { title, genre, releaseYear } = req.body;
    let matchedTitle = false;
    let id = games.length + 1;
    games.forEach(game => { if (game.title === title) matchedTitle = true});
    if(!title || !genre) {
        res.status(422).end();
    } else if (matchedTitle) {
        res.status(405).end();
    } else {
        games.push({id, title, genre, releaseYear})
        res.status(200).json({id, title, genre, releaseYear});
    }
});

server.get('/games', (req, res) => {    
    res.status(200).json(games);
});

server.get('/games/:id', (req, res) => {
    const { id } = req.params;
    const myGame = games.find(game => game.id === Number(id));
    if (!myGame) {
        res.status(404).end();
    } else {
        res.status(200).json(myGame);
    }
});

server.delete('/games/:id', (req, res) => {
    const { id } = req.params;
    const myIndex = games.findIndex(game => game.id === Number(id));
    console.log(myIndex)
    if (myIndex === -1) {
        res.status(404).end();
    } else {
        games.splice(myIndex, 1);
        res.status(200).json({id: id});
    }
})


module.exports = server;