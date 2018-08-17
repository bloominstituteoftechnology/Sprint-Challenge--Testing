const express = require("express");
const db = require('./data/dbConfig');
const server = express();
server.use(express.json());
const serverErrorMsg = 'Error processing your request';


module.exports = server;