const express = require('express')
const server = express()

server.use(express.json())

server.get('/' , (req, res) => {
    res.status(200).send('is running');
});

module.exports = server;
//module.export__S__ - wont forget the s again