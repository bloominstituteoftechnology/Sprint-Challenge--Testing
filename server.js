const express = require('express')

const server = express()

server.use(express.json())

server.get('/', (req,res) => {
    res.status(200).json({ message : "App running" })
})



module.exports = server