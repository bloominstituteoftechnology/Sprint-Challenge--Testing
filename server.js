

//== Games API Server ==========================================================

//-- Depedencies ---------------------------------
const express = require('express');
const config     = require('./config.js'     );
const dataAccess = require('./data_access.js');

//-- Server Configuration ------------------------
const server = module.exports = express();
server.use(express.json());
server.get   (   config.URL_API_GAMES      , handleGetAll );
server.get   (`${config.URL_API_GAMES}/:id`, handleGetById);
server.post  (   config.URL_API_GAMES      , handleCreate );
server.delete(`${config.URL_API_GAMES}/:id`, handleDelete );
server.use (errorHandler)

//== Route Handlers ============================================================

//-- Error Handling ------------------------------
async function errorHandler(error, request, response, next) {
    if (response.headersSent) {
        return next(error)
    }
    switch(error.message) {
        case config.ERROR_NOTFOUND: {
            response.status(404).json({"message": error.message});
            break;
        }
        case config.ERROR_TITLECONFLICT: {
            response.status(405).json({"message": error.message});
            break;
        }
        case config.ERROR_DATAINCOMPLETE: {
            response.status(422).json({"message": error.message});
            break;
        }
        default: {
            response.status(500).json({
                "message": config.ERROR_INTERNAL,
            });
        }
    }
}

//-- Get All Games (as array) --------------------
async function handleGetAll(request, response, next) {
    try {
        const gamesList = await dataAccess.getAll();
        response.status(200).json({
            "games": gamesList,
        });
    } catch(error) { next(error);}
}

//-- Get All Games (as array) --------------------
async function handleGetById(request, response, next) {
    try {
        const gameId = request.params.id;
        const game = await dataAccess.getById(gameId);
        response.status(200).json(game);
    } catch(error) { next(error);}
}

//-- Create a Game -------------------------------
async function handleCreate(request, response, next) {
    try {
        const gameData = request.body;
        const gameId = await dataAccess.create(gameData);
        response.status(201).json({
            [config.FIELD_ID]: gameId,
        });
    } catch(error) { next(error);}
}

//-- Delete a Game -------------------------------
async function handleDelete(request, response, next) {
    try {
        const gameId = request.params.id;
        const oldGame = await dataAccess.deleteById(gameId);
        response.status(200).json(oldGame);
    } catch(error) { next(error);}
}
