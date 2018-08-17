const request = require('supertest');
const server = require('./server');

describe('server.js endpoints', () => {
    describe('POST /games', () => {
        it('should return status code 201 and JSON', async () => {
            await request(server)
                .post('/games')
                .send({ title: 'A wise fairy', genre: 'Fiction' })
                .expect('Content-Type', /json/)
                .expect(201);
        });

        it('should return status code 422 if title and body are not provided', async () => {
            await request(server)
                .post('/games')
                .expect(422);
        });

        it('should return status code 405 if a game with the title sent already exists', async () => {
            await request(server)
                .post('/games')
                .send({ title: 'Fortnite', genre: 'Fiction' })
                .expect(405)
        })
    });

    describe('GET /games', () => {
        it('should return status code 200', async () => {
            await request(server)
                .get('/games')
                .expect(200);
        });
    });
});