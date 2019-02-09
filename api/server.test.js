const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig')

 describe('the route handler', () => {
    describe('get /games', () => {
        it('respond with 200', async () => {
            const response = await request(server)
                .get('/');
            expect(response.status).toBe(200);
        })
     
    })
})



describe('create new games entry', () => {
    describe('post /games', () => {
        afterEach(async () => {
            await db('games').truncate();
        })
        it('respond with 201', async () => {
            const body = { title: 'test', genre: 'testGenre' };
            const response = await request(server)
                .post('/games').send(body);
            expect(response.status).toBe(201);

        })
        it('respond with 400 when body is missing', async () => {
            const body = {};
            const response = await request(server)
                .post('/games').send(body);
            expect(response.status).toBe(400);

        })
    })
})
