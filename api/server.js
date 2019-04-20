/* Framework and Library requires */
const express = require('express');

/* Local file requires */
const dbHelpers = require('../data/helpers');

const server = express();

server.use(express.json());

/* The get endpoint for games...
*  Sends back an array of game objects.
*/
server.get('/games', async (req, res) => {
    const games = await dbHelpers.getAll();
    res.status(200).json(games);
});

/* The post endpoint for games...
*  Checks the object being sent to the server to make sure it: Contains the correct information, is not a duplicate.
*/
server.post('/games', async (req, res) => {
    const game = req.body;
    /* Check that the object received always contains a title and genre in string format. */
    if (typeof(game.title) === 'string' && typeof(game.genre) === 'string') {
        const ids = await dbHelpers.insert(game);
        res.status(201).json({id: ids[0]});
    }
    else {
        res.status(422).json({errorMessage: 'The object sent to server must contain a title and genre.'});
    }
});

module.exports = server;