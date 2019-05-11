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
    it('returns JSON data', async () => {
        const res = await request(server).get('/');
        expect(res.type).toBe('application/json'); // or .toMatch(/json/i)
    });

// Functional (returns a 'Hello world' object)
    it('is functional', async () => {
        const res = await request(server).get('/');
        expect(res.body).toEqual({ message: 'Hello World'});
    });
});

/* Games GET testing */

describe('GET ("/games")', () => {
    it('returns status code 200', async () => {
        let res = await request(server).get('/api/games');
        expect(res.status).toBe(200);
    });

    it('returns an array', async () => {
        let res = await request(server).get('/api/games');
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('returns an object array', async () => {
        let res = await request(server).get('/api/games');
        for (i = 0; i < res.body.length; i++) { // iterate through each item in the response body
            expect(typeof res.body[i]).toEqual('object');
        };
    });
});

/* Games POST testing */
describe('POST ("/games")', () =>{
    it('returns 201 with correct data', async () => {
        const body = {
            title: 'The most dangerous game',
            genre: 'Bad editing',
            releaseYear: 2133
        };
        let res = await request(server).post('/api/games').send(body);
        expect(res.status).toBe(201);
    });

    it('returns an object', async () => {
        const body = {
            title: 'Pacman',
            genre: 'Arcade',
            releaseYear: 1980
        };
        let res = await request(server).post('/api/games').send(body);
        expect(typeof res.body).toEqual('object');
    });

    it('returns 422 with incorrect data', async () => {
        const body = {
            title: 'Pacman',
            releaseYear: 1980
        };
        let res = await request(server).post('/api/games').send(body);
        expect(res.status).toBe(422);
    });
});