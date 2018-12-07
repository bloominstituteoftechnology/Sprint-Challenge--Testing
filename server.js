

//== Games API Server ==========================================================

//-- Depedencies ---------------------------------
const express = require('express');
const config     = require('./config.js'     );
const dataAccess = require('./data_access.js');

//-- Server Configuration ------------------------
const server = module.exports = express();
server.use(express.json());
server.get (config.URL_API_GAMES, handleGet   );
server.post(config.URL_API_GAMES, handleCreate);

//== Route Handlers ============================================================

//-- Get All Games (as array) --------------------
async function handleGet(request, response, next) {
    const gamesList = await dataAccess.get();
    response.status(200).json({
        "games": gamesList,
    });
    next();
}

//-- Create a Game -------------------------------
async function handleCreate(request, response, next) {
    try {
        const gameData = request.body;
        const gameId = await dataAccess.create(gameData);
        response.status(201).json({
            [config.FIELD_ID]: gameId,
        });
    }
    catch(error) {
        if(error.message === config.ERROR_DATAINCOMPLETE) {
            response.status(422).json({
                "message": config.ERROR_DATAINCOMPLETE,
            });
        } else {
            response.status(500).json({
                "message": config.ERROR_INTERNAL,
            });
        }
    }
    finally {
        next();
    }
}
