const request = require('supertest');


const server = require('./server.js');
const db = require('../data/dbConfig.js');

describe('the route handler', () => {
    describe('get /', () => {
        it('responds with 200', async () => {
            const response = await request(server)
            .get('/');

            expect(response.status).toBe(200);
        })

        it('responds with json', async () => {
            const response = await request(server)
            .get('/');

            expect(response.type).toMatch(/json/i);
        })

        it('sends correct response object', async () => {
            const response = await request(server)
            .get('/');

            expect(response.body).toEqual({api: 'up'});
        })
    });

    describe('get games', () => {

        afterEach(async () => {
            await db('games').truncate();
        })

        it('responds with 200', async () => {
            const response = await request(server)
            .get('/games');

            expect(response.status).toBe(200);
        })


        it('responds with json', async () => {
            const response = await request(server)
            .get('/games');

            expect(response.type).toMatch(/json/i);
        })

        it('sends correct response object', async () => {
            const response = await request(server)
            .get('/games');

            expect(response.body).toEqual([]);
        })
    })

    describe('post /games', () => {

        afterEach(async () => {
            await db('games').truncate();
        })

        it('responds with 201', async () => {
            const body = { title: 'Pacman',
                           genre: 'Arcade'};
            const response = await request(server).post
            ('/games').send(body);

            expect(response.status).toBe(201);
            
        })

        it('responds with 422 when missing data', async () => {
            const body = { };
            const response = await request(server).post
            ('/games').send(body);

            expect(response.status).toBe(422);
        })

        it('responds with an array containing a new id', async () => {
            const body = { title: 'Pacman',
                           genre: 'Arcade' };
            const response = await request(server).post
            ('/games').send(body);

            expect(response.body.length).toBe(1);
        })
    })

});