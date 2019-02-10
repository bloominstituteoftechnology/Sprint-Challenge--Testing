const express = require('express');
const db = require('../data/dbConfig');

const server = express();

server.use(express.json());

server.get('/games', async(req, res)=>{
    const rows = await db('games')
    res.status(200).json(rows);
})

server.post('/games', async (req, res)=>{
    const game = req.body;
    if(game.name && game.genre){
        const id = await db('games').insert(game)
        res.status(201).json(game)
    }else{
        res.status(401).json({message: 'please provide a name and genre'})
    }
} )

module.exports = server;