const request = require('supertest');

const server = require('./server.js')

describe('server', () => {
    it('should be running', async () => {
        const response = await request(server).get('/')

        expect(response.status).toBe(200)
    })
})