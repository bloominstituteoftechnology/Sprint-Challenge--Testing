

//== Games API Server ==========================================================

//-- Depedencies ---------------------------------
const express = require('express');
const config = require('./config.js');

//-- Server Configuration ------------------------
const server = module.exports = express();
server.use(express.json());
server.get (config.URL_API_GAMES, handleGet   );
server.post(config.URL_API_GAMES, handleCreate);

//== Route Handlers ============================================================

//-- Get All Games (as array) --------------------
async function handleGet(request, response, next) {}

//-- Create a Game -------------------------------
async function handleCreate(request, response, next) {}
