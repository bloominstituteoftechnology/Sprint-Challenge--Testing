const request = require('supertest');
const server = require('./server');

describe('GET /server', async () => {
    it('should return 200 status code', () => {
        const res = await request(server)
        .get('/games')
        expect(res.status).toEqual(200);
    })

    it('should return an array of games', async () => {
        const expected = server.games;
        const res = await request(server)
        .get('/games')
        expect(res.body).toEqual(expected)
    })

    it('should return an empty array if no games are supplied', async () => {
        const expected = [];
        const res = await request(server)
        .get('/games')
        expect(res.body).toEqual(expected);
    })
})