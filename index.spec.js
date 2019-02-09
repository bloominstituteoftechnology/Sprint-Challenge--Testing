const request = require('supertest');
const server = require('./server');

describe('the route hanlder', () => {
    describe('get /', () => {
        it('response with 200', async () => {
            const response = await request(server).get('/');
            expect(response.status).toBe(200);
        })

        it('response return json', async () => {
            const response = await request(server).get('/');
            expect(response.type).toBe('application/json');
        })

        it('response with certain format', async () => {
            const response = await request(server).get('/');
            expect(response.body).toEqual({ api: 'up' });
        })
    })
});