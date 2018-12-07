const express = require('express');
const server = express();
const db = require('./data/db')

server.use(express.json())

const port = 5300;

server.listen(port, function() {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
    
});

server.post('/games', (req,res) => {
    const game = req.body;
    db.add(game)
    .then(id => {
        res.status(201).json({message: 'Successful Post'})
    })
    .catch(err => {
        res.status(422).json({message: 'Post Failure'})
    })
})

server.get('/games', (req,res) => {
    db.getAll()
    .then(games => {
        res.status(200).json(games)
    })
    .catch(err => {
        res.status(500).json({message: 'Unable to retrieve games'})
    })
})


module.exports = server;