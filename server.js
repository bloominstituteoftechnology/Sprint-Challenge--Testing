const express = require('express')
const server = express()
const db = require('./data/dbConfig.js')
server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({ message: 'im working' })
}) 

module.exports = server;