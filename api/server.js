const express = require('express');
const server = express();
const db = require('../data/dbConfig');

server.use(express.json());
