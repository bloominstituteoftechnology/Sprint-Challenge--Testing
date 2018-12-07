const express = require('express');
const server = express();
server.use(express.json());

server.get('/', (_, res) => {
    res.status(200).json({ api: 'up' });
});

///endpoints go here
const db = [];
/// get 
server.get('/games', (_, res) => {
    res.status(200).json(db);
});

/// post
server.post('/games', (req, res) => {
    const game = req.body;
    if (!game.title || !game.genre) {
        return res.status(422).json({ message: 'invalid game data' });
    } 
    else {
        db.push(game);
        res.status(201).json({ message: 'game created' });
    }
});

module.exports = server;

const port = 3300;
server.listen(port, function() {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});