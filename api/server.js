const express = require('express');
const db = require('../games/gamesModel');
const server = express();
server.use(express.json());

require('events').EventEmitter.defaultMaxListeners = 0;

server.get('/', (req, res) => {
    db.fetch()
        .then(games => {
            res.json(games)
        })
        .catch(err => {
            res.status(500).json({
                message: "Could not fetch the games!"
            })
        })
})

server.get('/:id', (req, res) => {
    const {id} = req.params;

    db.fetch(id)
        .then(game => {
            if(game){
                res.json(game)
            } else {
                res.status(404).json({
                    message: "That game doesn't seem to exist..."
                })
            }
        })
        .catch( err => {
            res.status(500).json({
                message: "That game cannot be found..."
            })
        })
})

server.post('/', (req, res) => {
    const game = req.body;

    if(game.title && game.genre){
        db.insert(game)
            .then(response => res.status(201).json(response))
            .catch(err => {
                res.status(405).json({
                    message: "New games must have a unique title. Are you sure that game isn't already listed?"
                })
            })
    } else if(game.title){
        res.status(422).json({
            message: "New games need a genre."
        })
    } else if(game.genre){
        res.status(422).json({
            message: "New games need a title."
        })
    } else {
        res.status(422).json({
            message: "New games need a title and genre."
        })
    }
})

server.delete('/:id', (req, res) => {
    const {id} = req.params;

    db.fetch(id)
        .then(game => {
            const theGame = game;

            db.remove(id)
                .then(response => {
                    if(response){res.status(200).json(theGame)}
                    else{
                        res.status(404).json({
                            message: "This game does not seem to exist..."
                        })
                    }
                })
        })
        .catch(err => {
            res.status(500).json({
                message: "This game is invincible. You'll have to try harder to delete it."
            })
        })
})


module.exports = server;