const express= require('express');
const server= express();
server.use(express.json());
const knex= require('knex');

const knexConfig= require('../knexfile');
const db= knex(knexConfig.development);



server.get('/', (req, res)=>{
    res.status(200).json({api: 'up and running'})
});

server.get('/games', (req, res)=>{
    db('games').select()
    .then(game=>{
        res.status(201).json(game)
    })
    .catch(error=>{
        res.status(500).json({message:"error getting games"})
    })
})

server.post('/games', (req, res)=>{
    const game=req.body;
    console.log(game)
    db('games')
    .insert(game)
    .then(id=>{
        console.log(id)
        res.status(201).json(id)
    })
    .catch(error=>{
        res.status(422).json({message:'please provide at least two field title and genre'})
    })
})
module.exports= server;
