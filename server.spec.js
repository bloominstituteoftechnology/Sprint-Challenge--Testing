const request = require('supertest');

const server = require('./server.js');

describe('server.js', () => {
    describe('GET /games', () => {
        it('should return status code 200 OK', async () => {
            const expected = 200;

            const response = await request(server).get('/games');

            expect(response.status).toEqual(expected);
        });

        it('should return JSON', async () => {
            const expected = [];

            const response = await request(server).get('/games');

            expect(response.body).toEqual(expected);
        });
    });
});