const request = require('supertest');
const db = require('./database/db');
const server = require('./server');

describe('server.js', () => {

    describe('POST to /games', () => {
        it('should return status 201 if game info is complete', async () => {
            const response = await request(server).post('/games').send({
                "title": "testing",
                "genre": "testing",
                "releaseYear": 1980
            });
            expect(response.status).toBe(201);
        });

        it('should return status 422 if game info is incomplete', async () => {
            const response = await request(server).post('/games').send({
                "title": "testing",
            });
            expect(response.status).toBe(422);
        });

        it('should return an array with insertionCount', async () => {
            const response = await request(server).post('/games').send({
                "title": "testingCount",
                "genre": "testingCount",
                "releaseYear": 1980
            });
            expect(response.body).toBeInstanceOf(Array);
        });


    });

    describe('GET to /games', () => {
        it('should return status 200', async () => {
            const response = await request(server).get('/games');
            expect(response.status).toBe(200);
        });

        it('should return an array of games', async () => {
            const response = await request(server).get('/games');
            expect(response.body).toBeInstanceOf(Array);
        });

        it('should return an empty array if there are no games', async () => {
            await db('games').truncate();
            const response = await request(server).get('/games');
            expect(response.body).toBeInstanceOf(Array);
        });
    });
});