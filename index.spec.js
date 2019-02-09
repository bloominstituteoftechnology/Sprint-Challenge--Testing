const request = require('supertest');

const server = require('./index');

describe('server endpoints', () => {

    describe('get /', () => {

        test('responds with 200', async () => {
            const response = await request(server).get('/');
            expect(response.status).toBe(200);
        });

        test('responds with json', async () => {
            const response = await request(server).get('/');
            expect(response.type).toMatch(/json/i);
        });

        test('sends correct response object', async () => {
            const response = await request(server).get('/');
            expect(response.body).toEqual({api: 'active'});
        });

    });

});