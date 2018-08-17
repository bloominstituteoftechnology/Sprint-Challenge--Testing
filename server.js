const express = require('express');
const server = express();
server.use(express.json());

const db = require('./data/db');

// server.get('/games', (req, res) => {
//     res.status(200).json([1,2]);
//     // res.status(200).json([]);
//     // res.status(200).json('hey');
//     // res.status(200).json({hey: 'you'});
// });

// server.post('/games', (req, res) => {
//     const { title, genre, releaseYear } = req.body;
//     if ( !title || !genre ) {
//         return res.status(422).json([]);
//     };
//     res.status(201).json([]);
// });

server.get('/games', (req, res) => {
    db('games').then(response => {
        res.status(200).json(response);  
    }).catch(error => {
        res.status(500).json(error);
    });
});

server.post('/games', (req, res) => {
    const { title, genre, releaseYear } = req.body;
    if ( !title || !genre ) {
        return res.status(422).json(['title and genre required']);
    }
    const newGame =  { title, genre, releaseYear };
    db('games')
        .where({title: title})        
        .then(response => {
            if (response.length === 1) {
                return res.status(405).json('title already exists');
            } else {
                db('games').insert(newGame).then(response => {
                    res.status(201).json(response);
                });
            };
        })
        .catch(error => {
            res.status(500).json(error);
        });        
});



module.exports = server;