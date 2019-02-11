const request = require('supertest');
const server = require('./server');

describe('the route hanlder', () => {
    describe('get /', () => {
        it('response with 200', async () => {
            const response = await request(server).get('/');
            expect(response.status).toBe(200);
        })

    });

    describe('get /games', () => {
        it('response with 200', async () => {
            const response = await request(server).get('/games');
            expect(response.status).toBe(200);
        })

        it('response return json', async () => {
            const response = await request(server).get('/games');
            expect(response.type).toMatch(/json/i);
        })

        it('sends the correct response object', async () => {
            const response = await request(server).get('/games');
            expect(Array.isArray(response.body)).toBe(true);
        })
    })

    describe('post /', () => {
        it('response with 201', async () => {
            const body = { title: 'Overcook', genre: 'Strategy' };
            const response = await request(server)
                .post('/games')
                .send(body);
            expect(response.status).toBe(201);
        });
        it('response with 422 when missing required fields', async () => {
            const body = { title: 'Game with no genre' };
            const response = await request(server)
                .post('/games');
            expect(response.status).toEqual(422);
        });

    });
});