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
                .expect(405);
        });
    });

    describe('GET /games', () => {
        it('should return status code 200 and JSON', async () => {
            await request(server)
                .get('/games')
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });

    describe('GET /games:id', () => {
        it('should return status code 200, JSON, and the game with the id provided', async () => {
            await request(server)
                .get('/games/1')
                .expect('Content-Type', /json/)
                .expect(200, { id: 1, title: 'Jigsaw Planet', genre: 'Puzzle' });
        });

        it('should return status code 404 if the game with the id provided does not exist', async () => {
            await request(server)
                .get('/games/5')
                .expect(404);
        });
    });

    describe('DELETE /games:id', () => {
        it('should return status code 200, JSON, and { removed: id }', async () => {
            await request(server)
                .delete('/games/3')
                .expect('Content-Type', /json/)
                .expect(200, { removed: 3 });
        });

        it('should return status code 404 if the game with the id provided does not exist', async () => {
            await request(server)
                .delete('/games/5')
                .expect(404);
        });
    });
});