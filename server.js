const express = require('express');
const server = express();

server.use(express.json());

let games = [
    { id: 0, 'name': 'MHW' , 'genre': 'JRPG' },
    { id: 1, 'name': 'AC Odyssey', 'genre': 'RPG' },
    { id: 2, 'name': 'Marvel\'s Spiderman' , 'genre': 'RPG' },
];

server.get('/games', (req, res) => {
    res.status(200).json(games);
})

server.get('/games/:id', (req, res) => {
    const { id } = req.params;
    if (  games.find( game => Number(game.id) === Number(id)) ) {
        games = games.filter( game => Number(game.id) === Number(id)) ;
        res.status(200).json( games );
    } else {
        res.status(404).json({
            message: "Cannot find game with the provided ID."
        })
    }
});

server.post('/games', (req, res) => {
    const { name, genre } = req.body;
    let id = games.length;
    if ( !name || !genre ) {
        res.status(422).json({
            message: 'Name and genre are both required.'
        })
    } else if ( games.find( game => game.name === name )){
        res.status(405).json({
            message: "Game title exists in database already."
        })
    } else {
        games.push( { id, name, genre } );
        res.status(201).json( games );
    }
});

server.listen( 8000, () => console.log('Server listening on port 8000'));

module.exports = server;