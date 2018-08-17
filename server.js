const express = require("express");
const db = require('./data/dbConfig');
const server = express();
server.use(express.json());
const serverErrorMsg = 'Error processing your request';

server.get('/', (req, res) => {
    db('games')
    .then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
    res.status(500).json(serverErrorMsg);
    });
});

server.post('/', (req, res) => {
    db('games')
    .insert(req.body)
    .then(response => {
        res.status(201).json(response);
    })
    .catch(err => {
        res.status(500).json(serverErrorMsg);
    })
});
module.exports = server;