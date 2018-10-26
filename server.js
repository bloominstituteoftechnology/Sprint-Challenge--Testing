const express = require('express');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({sanity: 'checked'});
});

let games = [];

server.post('/games', (req, res) => {
    const {title, genre, releaseYear} = req.body;
    const year = releaseYear;
    if(title, genre, year){
        const game = {title, genre, year};
        games.push(game);
        res.status(200).json(game);
    }else{
        res.status(400).json(
            {
                error:
                'Missing genre, or title, or releaseYear.'
            }
        );
    }
});

server.get('/games', (req, res) => {
    const list = games.map(game => {
        return game.title;
    });
    res.status(200).json({games:list});
});

server.get('/clear', (req, res) => {
    games = [];
    res.status(200).json({message:'Games cleared.'});
});

module.exports = server;