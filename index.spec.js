const request = require('supertest');
const server = require('./api/server');
const db = require('./data/dbConfig');

beforeEach(async () => {
    await db('games').truncate();
})

describe('server.js', () => {

    describe('get request to /api/games', () => {
        it('should return a 200 status code', async () => {
            const response = await request(server).get('/api/games');
            expect(response.status).toBe(200);
        });

        it('should return json', async () => {
            const response = await request(server).get('/api/games');
            expect(response.type).toBe('application/json');
        });

        it('should return an array of games', async () => {
            const response = await request(server).get('/api/games');
            expect(response.body).toEqual(expect.any(Array));
        });
    });

    describe('post request to /api/games', () => {
        it('should return a 200 status code', async () => {
            const title = 'game1';
            const genre = 'adventure';
            const releaseYear = 2007;
            const response = await request(server)
            .post('/api/games')
            .send({title, genre, releaseYear});
            expect(response.status).toBe(200);
        });

        it('should return a 422 status code if information is incomplete', async () => {
            const genre = 'fantasy';
            const releaseYear = 2010;
            const response = await request(server)
            .post('/api/games')
            .send({genre, releaseYear});
            expect(response.status).toBe(422);
        });

        it('should return json', async () => {
            const title = 'game2';
            const genre = 'adventure';
            const releaseYear = 2015;
            const response = await request(server)
            .post('/api/games')
            .send({title, genre, releaseYear});
            expect(response.type).toBe('application/json');
        })
    })
})