const express = require('express');

const server = express();

const games = require('./data.js')

server.use(express.json());

const newGame = {
    id: '6', 
    name: 'boggle', 
    difficulty: 'easy'}; 

server.get('/', (req,res)=> {
res.status(200).json({api: 'running'});
});

server.get('/games', (req,res) => {
    res.status(200).json({games});
    });

server.post('/games', function (req, res) {

    if(!req.body.name||!req.body.difficulty)
        {res.status(422).json({message:  'please enter a name and a difficulty level'})

    }else{
        
        const newGame = {
            id: '6', 
            name: 'boggle', 
            difficulty: 'easy'}; 

        games.push(newGame)
        res.status(201).json(games)
    }
    });

module.exports = server;