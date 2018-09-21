const express = require('express');
const server = express();

server.use(express.json());

let games = [
    { 'name': 'MHW' , 'genre': 'JRPG' },
    { 'name': 'AC Odyssey', 'genre': 'RPG' },
    { 'name': 'Marvel\'s Spiderman' , 'genre': 'RPG' },
];

server.get('/games', (req, res) => {
    res.status(200).json(games);
})

server.post('/games', (req, res) => {
    const newGame = req.body;
    if ( !newGame.name || !newGame.genre ) {
        res.status(422).json({
            message: 'Name and genre are both required.'
        })
    } else {
        games.push( newGame );
        res.status(201).json( games );
    }
});

//server.listen( 8000, () => console.log('Server listening on port 8000'));

module.exports = server;