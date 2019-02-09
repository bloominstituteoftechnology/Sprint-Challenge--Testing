const request = require('supertest');
const server = require('./server');

describe('testing server', () => {
    describe('GET tests', () => {
        it('returns status 200', async () => {
            const response = await request(server).get('/games');
            expect(response.status).toEqual(200);
        });
        it('returns array', async () => {
            const response = await request(server).get('/games');
            expect(Array.isArray(response.body)).toEqual(true);
        });
        it('returns empty array', async () => {
            const response = await request(server).get('/games');
            expect(response.body).toEqual([]);
        })
    })
})