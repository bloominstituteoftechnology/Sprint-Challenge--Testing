const express = require('express')
const server = express();
server.use(express.json())
const db = []
let nextId = 0;
server.get('/games', (req, res) => {
    res.status(200).json(db)
})
server.post('/games', (req, res) => {
    if (req.body.title) {
        db.forEach(e => {
            if (Object.values(e).includes(req.body.title)) {
                res.status(405).json({
                    error: "unique constraints"
                })
                res.end();
            }
        })
        const data = req.body
        data.id = nextId++;
        db.push(data)
        res.status(200).json(
            db
        )
    } else {
        res.status(422).json({
            error: "data is reqiured"
        })
    }
})

module.exports = server;