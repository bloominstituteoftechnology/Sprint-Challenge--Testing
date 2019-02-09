const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig')

 describe('the route handler', () => {
    describe('get /games', () => {
        it('respond with 200 when get is successful', async () => {
            const response = await request(server)
                .get('/');
            expect(response.status).toBe(200);
        })
        it('should return an empty array when db is empty', async () => {
            const response = await request(server)
                .get('/');
            
                expect(response.status).toBe(200);
        })
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
        it('respond with 201 when post is successful', async () => {
            const body = { title: 'test', genre: 'testGenre' };
            const response = await request(server)
                .post('/games').send(body);
            expect(response.status).toBe(201);

        })
        it('respond with 422 when the genre is missing', async () => {
            const body = { title: 'test'};
            const response = await request(server)
                .post('/games').send(body);
            expect(response.status).toBe(422);

        })
        it('respond with 422 when the title is missing', async () => {
            const body = { genre: 'testGenre'};
            const response = await request(server)
                .post('/games').send(body);
            expect(response.status).toBe(422);

        })
        it('respond with 422 when post is incomplete', async () => {
            const body = {};
            const response = await request(server)
                .post('/games').send(body);
            expect(response.status).toBe(422);

        })
    })
})
