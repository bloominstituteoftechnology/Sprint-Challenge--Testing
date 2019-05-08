const request = require('supertest'); // initialize supertest for endpoints 
const server = require('./server');  // bring in the server
const db = require('../dbConfig'); // bring in the database

/* Home endpoint testing*/

// Returns code 200
describe('GET ("/") ', () => {
    it('returns status code 200', async () => {
        let res = await request(server).get('/');
        expect(res.status).toBe(200);
    });

// Returns JSON data
    it('verifies that JSON data is received', async () => {
        const res = await request(server).get('/');
        expect(res.type).toBe('application/json'); // or .toMatch(/json/i)
    });

// Functional (returns a 'Hello world' object)
    it('verifies functionality', async () => {
        const res = await request(server).get('/');
        expect(res).toEqual({ message: 'Hello World'});
    });
});

/* Games GET testing */
/* Games POST testing */