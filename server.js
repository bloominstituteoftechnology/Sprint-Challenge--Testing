const express = require('express')
const server = express();
server.use(express.json());
let games =[];
server.post('/games', (req,res)=>{
    const game = req.body;
    games.unshift(game);
   
   if (game.title && game.genre){
    res.status(201).json({games})
    return games;
    }
   else{
        res.status(422).json({statusCode : '422'})
        
   }
});

server.get('/games', (req,res)=>{
     
    if (games.length !== 0){
     res.status(200).json({games})
     }
    else{
         res.json({games})
         
    }
 
 
 })

module.exports = server;