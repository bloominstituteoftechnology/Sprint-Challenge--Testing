const express = require('express');

// The GET /games endpoint should return the list of games and HTTP status code 200.

// Write a test to make sure this endpoint always returns an array, even if there are no games stored. If there are no 
// games to return, the endpoint should return an empty array.

// In the route handler, validate that the required fields are included inside the body. If the information is incomplete, return a 422 status code.

// Write a GET /games/:id endpoint that returns the information about a single game. Respond with a 404 status code 
// when a game is not found for the provided id. Add the corresponding tests for it.

// add a DELETE /games/:id endpoint that can remove the corresponding game. If the game does not exists return a 
// 404 status code. Write tests for this endpoint.

module.exports = server;