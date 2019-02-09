const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');

//minimum 3 tests per endpoint


//GET (200 status) (always return an array, even if no games)


//GET /:id responds 200, sends correct response, (404 if doesn't exist)


//POST - 201 success, sends correct response, unique title (405 error if not) (422 if missing title/genre)


//DELETE /:id, 200 success, sends correct response, (404 if doesn't exist)

