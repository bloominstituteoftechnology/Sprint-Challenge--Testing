const express = require('express');
const server = express();
//games -db
const games = require('../games/gamesModel.js');

server.use(express.json());

server.get('/', async (req,res) => {
   res.status(200).json({api: `Server is up and running..keep writing the code`});
});

server.get('/games', async (req,res) => {
    const allGamesData = await games.getAll() ? await games.getAll() : [];
     try { 
        res.status(200).json(allGamesData);
    }
    catch(error) {
        res.status(500).json({error:error});
    }
 });

 server.post('/games',  (req,res) => {
      const game = req.body;
      const title = game.title;
      const genre = game.genre;

      if(title && genre) {
         games.insert(game)
              .then( ids => {
                 res.status(201).json({ids});
              })
              .catch(err => {
                 res.status(500).json({err:`something went wrong`});
              });
      } else {
               res.status(422).json({err:`Missing title or genre`});
      }
    
      // if(title && genre) {
      //   try {
      //   const ids = await games.insert(game);
      //   // console.log('id',ids);
      //   res.status(201).json(ids);
      //   } catch(error) {
      //     res.status(500).json({error:`cannot post at this time`});
      //   }
      // } else {
      //   res.status(422).json({err:`Missing title or genre`});
      // }  
       
      
 });

module.exports = server;