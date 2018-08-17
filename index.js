const express = require('express')
const server = express();
server.use(express.json())

server.get('/games', (req, res) => {
    res.status(200).json([])
})
server.post('/games', (req, res) => {
    if (req.body.title) {
        const data = req.body
        res.status(200).json({
            data
        })
    } else {
        res.status(422).json({
            error: "data is reqiured"
        })
    }
})

module.exports = server;