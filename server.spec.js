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
    });

    describe('GET /games', () => {
        it('should return status code 200 and an array of games', async () => {
            await request(server)
                .get('/games')
                .expect(200);
        });
    });
});