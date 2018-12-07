const request = require('supertest');
const games = require('./games.js');
const server = require('./api/server.js');

describe('server.js', () => {
    describe('/', () => {
        it('should return a status 200', async () => {
            let response = await request(server).get('/');

            expect(response.status).toBe(200);
        })
    })
})