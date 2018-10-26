const server = require('./api/server.js');
const request = require('supertest');

describe('API testing', () => {
    describe('GET', () => {
        it('should send a list of games in an array', async () => {
            const response = await request(server).get('/games');
            expect(Array.isArray(response.body)).toBe(true);
        })

        it('should send a status of 200', async () => {
            const response = await request(server).get('/games');
            expect(response.status).toBe(200);
        })
    })
})