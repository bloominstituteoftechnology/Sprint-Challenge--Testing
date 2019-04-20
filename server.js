const express = require('express');
const server = express();
const db = require('./dbConfig');
const port = 3000;

server.use(express.json());


server.post('/games', async(req,res) =>{
    const gameData = req.body;
    if(gameData.title && gameData.genre){
        const games = db('games').insert(gameData).then(ids =>{
            res.status(201).json(ids);
        })
        .catch(() =>{
            res.status(500).json({message: 'failed to insert new game'});
        })
    }else{
        res.status(422).json({message : 'Missing data for post request'})
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





server.listen(port, () =>{
    console.log('Server is up and running my dude!')
});

module.exports = server