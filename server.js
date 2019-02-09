const express = require('express');
const server = express();
const db = require('./dbConfig');
//const games = require('./gameModel');

server.use(express.json());


server.post('/games', (req,res) =>{
    const gameData = req.body;
    if(!gameData.title || !gameData.genre){
        res.status(422).json({message : 'Missing data for post request'})
    }else{
        db('games').insert(gameData).then(ids =>{
            res.status(201).json(ids);
        })
        .catch(() =>{
            res.status(500).json({message: 'failed to insert new game'});
        })
    }
});

server.get('/games', (req, res) =>{
    db('games').then(games =>{
        res.status(200).json(games)
    })
    .catch(() =>{
        res.status(500).json({message: 'Failed to get games'})
    });
});





server.listen(4141, () =>{
    console.log('Server is up and running my dude!')
});

module.exports = server