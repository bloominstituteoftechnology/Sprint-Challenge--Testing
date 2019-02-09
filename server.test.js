
const request = require('supertest')

const server = require('./server.js')

describe('routeHandlers', () => {
    describe('/get', () => {

        it('responds with status 200', async () => {
            const response = await request(server).get('/games');

            expect(response.status).toBe(200);
        })

        it('responds with JSON', async () => {
            const response = await request(server).get('/games');

            expect(response.type).toMatch(/json/i);
        })
    })
})