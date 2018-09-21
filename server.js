const express = require('express');
const server = express();
server.use(express.json()); 

const knex = require('knex'); 
const dbConfig = require("./knexfile");
const db = knex(dbConfig.development);

const cors = require('cors'); 
server.use(cors()); 

server.get('/', (req, res) => {
    res.send('We are a go Mr. Snowblow!'); 
})


//=========Middleware==========//
function propertiesChecker(req, res, next){
    const game = req.body;

    if(game.title && game.genre && game.releaseYear) {
        next(); 
    } else {
        res.status(422).json({msg: "Posting a game requires properties of 'title', 'genre', and 'releaseYear'."})
    }
}

function duplicateGameChecker(req, res, next){
    const game = req.body; 
    db('games')
      .where({'title': game.title})
      .then(games => { 
          res.status(405).json({msg: "Cannot post duplicate games."})
      })
      .then(next()); 
    }

function couldNotGet(req, res, next) {
    var today = new Date();
    var todaysDate = today.getDate();
    
    if(todaysDate % 2 === 0) {
        res.status(403).json({msg: "Games can only be retrieved on an odd date of the month."});
    } else {
        next(); 
    }
}




//=========Endpoints==========//

server.get('/games',couldNotGet, (req, res) => {
    db('games')
        .then(games => {
            res.status(200).json(games)
        })
        .catch(err => { 
            res.status(500).json({msg: "No games for you budday!"})
        })
})

server.post('/games', propertiesChecker, duplicateGameChecker, (req, res) => {
    game = req.body
    db.insert(game).into('games')
        .then(games => {
            res.status(200).json(games)
        })
        .catch(err => { 
            res.status(500).json({msg: "Hey pal! Don't cha know how to add a game!?"})
        })
})

module.exports = server;