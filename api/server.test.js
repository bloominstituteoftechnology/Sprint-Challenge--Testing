const request = require('supertest');

const server = require('..api/server');

describe('The route handlers', () => {
    describe('get /', () => {
        it('responds with 200', async () => {
            const response = await request(server).get('/');

            expect(response.status).toBe(200);
        });

        it('responds with an array', async () => {
            const response = await request(server).get('/');
            expect(response.type).toMatch(/array/a);
        });
    });
});