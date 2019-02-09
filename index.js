require('dotenv').config();
const express = require('express');
const parser = express.json();
const server = express();
const server = require('./api/server.js');
server.use(express.json());
server.use(parser);

const sendUserError = (msg, res) => {
    res.status(400);
    res.json({ Error: msg });
    return;
};

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** server up on port ${port} **\n`));
