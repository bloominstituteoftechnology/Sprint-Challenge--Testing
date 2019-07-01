const request = require('supertest')

const server = require('./server')
const db = require('../data/dbConfig.js')

describe('server.js', () => {
    it('should return a 200 on the basic route', async () => {
        const res = await request(server).get('/');
        expect(res.status).toBe(200);
    })
})