const request = require('supertest');
const db = require('./database/db');
const server = require('./server');

describe('server.js', () => {

    describe('POST to /games', () => {
        it('should return status 201', async () => {
            const response = await request(server).post('/games').send({
                "title": "testing",
                "genre": "testing",
                "releaseYear": 1980
            });
            expect(response.status).toBe(201);
        })
    });

    describe('GET to /games', () => {
        it('should return status 200', async () => {
            const response = await request(server).get('/games');
            expect(response.status).toBe(200);
        })
    });
});