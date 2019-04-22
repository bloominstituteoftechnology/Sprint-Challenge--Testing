const request = require('supertest');

const server = require('./server');

const db = require('../data/dbConfig');

describe('The route handlers', () => {
    describe('get /', () => {
        it('responds with 200', async () => {
            const response = await request(server).get('/');

            expect(response.status).toBe(200);
        });

        it('responds with an array', async () => {
            const response = await request(server).get('/');
            expect(typeof response.body).toBe('array');
        });
    });

    describe('post /videogame', () => {
        afterEach(async () => {
            await db('videogames').truncate();
            await db.seed.run();
        });

        it('resonds with 201 if body is correct', async () => {
            const body = {title: 'Shining Force', genre: 'Role-playing'}
            const response = await request(server).post('/videogame').send(body);

            expect(response.status).toBe(201);
            db('videogames').truncate();
        });

        it('responds with 401 when body is missing data', async () => {
            const body = { }
            const response = await request(server).post('/videogame').send(body);

            expect(response.status).toBe(401)
            db('videogames').truncate();
        });
    });
});