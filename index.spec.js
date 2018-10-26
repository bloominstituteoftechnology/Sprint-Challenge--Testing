const request = require('supertest');
const server = require('./api/server.js');

describe('Server', () => {
    describe('GET /', () => {
        it('returns status code 200(OK)', async () => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
        });

        it('returns JSON', async () => {
            const res = await request(server).get('/');
            expect(res.type).toBe('application/json');
        });

        it('returns {message: "Server is up!"', async () => {
            const res = await request(server).get('/');
            expect(res.body).toEqual({message: 'Server is up!'});
        });
    });

    
});