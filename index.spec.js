const server = require('./api/server.js');
const request = require('supertest');

describe('API testing', () => {
    describe('GET', () => {
        it('should send a list of games in an array', async () => {
            const response = await request(server).get('/');
            expect(Array.isArray(response.body)).toBe(true);
        })
    })
})