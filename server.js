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
    let isUnique = true;
    games.forEach(game => {
        if(game.title===title){
            isUnique = false;
        }
    });
    if(title, genre, year){
        if(!isUnique){
            console.log('not unique title');
            res.status(405).json({error:'Title not unique.'});
        }else{
            const game = {title, genre, year};
            games.push(game);
            res.status(200).json(game);
        }
    }else{
        res.status(422).json(
            {
                error:
                'Missing genre, or title, or releaseYear.'
            }
        );
    }
});

const verifyUnique = title => {
}

server.get('/games', (req, res) => {
    const list = games.map(game => {
        return game.title;
    });
    res.status(200).json(list);
});

server.get('/clear', (req, res) => {
    if(games.length===0){
        res.status(400).json({message:'Already cleared.'});
    }
    games = [];
    res.status(200).json({message:'Games cleared.'});
});

module.exports = server;