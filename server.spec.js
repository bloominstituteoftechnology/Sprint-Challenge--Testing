const request = require('supertest');

const server = require('./server.js');


describe('GET /games', () => {
    it('should return status code 200 from /games' /*with list of games*/, async () => {
        const response = await request(server).get('/games');
        expect(response.status).toEqual(200);
    });
    it('should return an array, even if empty', async () => {
        const response = await request(server).get('/games');
        expect(response.body).toBeInstanceOf(Array);
    });
});