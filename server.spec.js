const request = require('supertest');
const server = require('./server');

describe('server.js endpoints', () => {
    describe('GET /games', () => {
        it('should return status code 200 and an empty array', async () => {
            await request(server)
                .get('/games')
                .expect(200, []);
        });
    });

    describe('POST /games', () => {
        it('should return status code 201, JSON, and `title, body` if releaseYear isnt sent', async () => {
            await request(server)
                .post('/games')
                .send({ title: 'A wise fairy', genre: 'Fiction' })
                .expect('Content-Type', /json/)
                .expect(201, { title: 'A wise fairy', genre: 'Fiction' });
        });

        it('should return status code 201, JSON, and `title, body, releaseYear`', async () => {
            await request(server)
                .post('/games')
                .send({ title: 'A wise fairy', genre: 'Fiction', releaseYear: 1999 })
                .expect('Content-Type', /json/)
                .expect(201, { title: 'A wise fairy', genre: 'Fiction', releaseYear: 1999 });
        });

        it('should return status code 422 if title and body are not provided', async () => {
            await request(server)
                .post('/games')
                .expect(422);
        });
    });
});