const express = require('express');
const db = require('./database/dbConfig');

const server = express();

server.use(express.json());

//BASIC ROUTE....
server.get('/', (req, res) => {
    res.status(200).json({message : "SERVER UP"})
})

//GET ROUTE.'/games' ...
let games = []; //JUST FOR TESTING PURPOSE TO CHECK RECEIVES ARRAY.
let gamesArray = [
     {title : 'GAME-1', genre : 'XYZ'},
     {title : 'GAME-2', genre : 'XYZ'},
     {title : 'GAME-3', genre : 'XYZ'} 
  ]

server.get('/games', (req, res) => {
          //if(res.body.length > 0) res.status(200).json(gamesArray);
          
          res.status(200).json(gamesArray);
})

server.get('/games/:id', (req, res) => {
     db('games')
          .where({id : req.params.id})
          .first()
          .then(game => { 
                res.status(200).json(game);
           })
          .catch(error => {
                response.status(500).json({error : 'The games data could not be retrieved'})
           })
 })
 
//POST ROUTE...
server.post('/games', (req, res) => {
     const {title, genre} = req.body;
     if(!title || !genre) {
          res.status(422).json({message : 'title and genre are required.'})
     } else {
          if (typeof title !== 'string' || typeof genre !== 'string') {
               res.status(500).json({ error: 'title and genre needs to be strings.' })
          } else {
               res.status(201).json({message : 'Successfully created.'})
          }
     }
})

module.exports = server;