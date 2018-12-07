const request = require('supertest');

const server = require('./api/server.js');

describe('server.js', () => {
    describe('get games route', () => {
        it('should return a list of games in an array', async () => {
            const response = await request(server).get('/games');
            expect(Array.isArray(response.body)).toBeTruthy;
        });
        it('should return status 200 with the list', async () => {
            const response = await request(server).get('/games');
            expect(response.status).toBe(200);
        });
        it('should return an empty array if no games have been stored', async () => {
            const response = await request(server).get('/games');
            expect(response.body.length).toBe(0);
        });
    });

    

});