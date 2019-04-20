const express = require('express');
const cors = require('cors');

const db = require('./dbHelper.js');


const server = express();


server.use(express.json());
server.use(cors());

server.get('/games', (req, res) => {
    db.retrieve()
    .then(response => {
        // console.log(response);
        // console.log('get request success!');
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        console.log('get request failure');
        res.status(500).json({error: 'get request failure'});
    })
});
server.post('/games/add-game', (req, res) => {
    db.add(req.body)
        .then(response => {
            console.log(response);
            console.log('post request success');
            res.status(201).json({msg: `${req.body} successfully added to games list!`})
        })
        .catch(err => {
            console.log(err);
            console.log('post request failure');
            res.status(500).json({error: 'post request failure'});
        })
});

module.exports = server;





















