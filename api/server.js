const express = require('express');
const server = express();
const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({
        api: 'up'
    });
});

server.post('/games', (req, res) => {
    const {
        title,
        genre
    } = req.body;
    if (title === undefined || title === "" || genre === undefined || genre === "") {
        res.status(422).json({
            err: "Please enter a title or genre."
        })
    } else {
        db("games").insert(req.body).then(id => {
            console.log(id)
            if(Array.isArray(id)) {
                return res.status(200).json(id)
            }
        }).catch(err => res.status(405).json({err: "No duplicates!"}));
    }
});

server.get('/games', (req, res) => {
    
    db("games").select()
        .then(games => {
            res.status(200).json(games)
        })
        .catch(err => res.json(err));
});

const port = process.env.PORT || 9000;
module.exports = server;