const request = require('supertest');

const router = require('./gamesRouter.js');

const server = require('../api/server.js');


describe('GET /', () => {
    it('should return 200 OK', async () => {
        const res = await request(server.use(router)).get('/')
        expect(res.status).toBe(200)
})
});