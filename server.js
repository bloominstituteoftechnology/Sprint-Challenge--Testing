const express = require('express');

const server = express();
server.use(express.json());


server.get('/games', async (req, res) => {
    try {

    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

const port = process.env.PORT || 9000;
server.listen(port, () => {console.log(`\nServer up on port ${port}\n`)});

module.exports = server;