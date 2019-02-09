const express = require('express');
const server = express();

const db = {msg:'I will get the data soon'};
server.use(express.json());

server.get('/', async (req,res) => {
   res.status(200).json({api: `Server is up and running..keep writing the code`});
});

server.get('/games', async (req,res) => {
    // const gamesData = await games.getAll();
    res.status(200).json(db);
});

module.exports = server;