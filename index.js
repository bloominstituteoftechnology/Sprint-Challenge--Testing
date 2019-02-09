require('dotenv').config();
const express = require('express');

const gameRouter = require('./api/gameRouter');

const server = express();
server.use(express.json());
server.use('/api/games', gameRouter);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'active' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`\n** server up on port ${PORT} **\n`)
});