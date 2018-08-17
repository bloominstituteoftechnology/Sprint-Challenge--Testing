const express = require('express')
const server = express();
server.use(express.json())
const db = []
let nextId = 0;
const checkConstraint = (data) => {
    let res;
    db.map(e => {
        if (Object.values(e).includes(data)) {
            res = true
        }
    })
    return res || false;
}

server.get('/games', (req, res) => {
    res.status(200).json(db)
})


server.post('/games', (req, res) => {
    if (req.body.title) {
        if (checkConstraint(req.body.title)) res.status(405).json({
            Error: "unique constraints"
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