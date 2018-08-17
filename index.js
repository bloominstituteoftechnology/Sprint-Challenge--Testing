const express = require('express');

const server = express();

server.use(express.json());

class ServerError {
    constructor(status,message){
        this.status = status;
        this.message = message
    }
}

let games = [{
    title: 'Mario',
    genre: 'platformer',
    releaseYear: 1990
}]

server.get('/', (req, res) => {
    res.status(200).json(games)
})

server.post('/', (req, res) => {
    let game = req.body;
    try {

        if (!game.title || !game.genre) { throw new ServerError(422, 'Please fill out title and genre') }
        else {
            games.map(title => {
                if (game.title === title.title) {
                    throw new ServerError(405, 'No Duplicates!')
                }
            })
        }

        games.push(game);
        res.status(200).json(game)

    }
    catch (error) {
        res.status(error.status).send(error.message)
    }

})

module.exports = server;
