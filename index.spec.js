const request = require('supertest');

const server = require('./api/server');

describe('server', () => {
    describe('GET /', () => {
        it('should return status code 200(OK)', async () => {
            const response = await request(server).get('/');

            expect(response.status).toBe(200);
        });
    });

    describe('POST /games', () => {
        it('should return JSON', async () => {
            const response = await request(server)
                .post('/games')
                
            expect(response.type).toBe('application/json');
        });
        it('should return status code 422 if data is incomplete', async () => {
            const testGame = { title: 'Pong' };
            const response = await request(server)
                .post('/games')
                .send(testGame);

            expect(response.status).toBe(422);
        });
        it('should return status code 201 if game is created successfully', async () => {
            const testGame = { title: 'Pong', genre: 'Sports', releaseYear: 1972 };
            const response = await request(server)
                .post('/games')
                .send(testGame);

            expect(response.status).toBe(201);
        });
    });

    describe('GET /games', () => {
        it('should return JSON', async () => {
            const response = await request(server).get('/games');

            expect(response.type).toBe('application/json');
        });
        it('should return status code 200(OK)', async () => {
            const response = await request(server).get('/games');

            expect(response.status).toBe(200);
        });

        it('should return an array', async () => {
            const response = await request(server).get('/games');

            expect(Array.isArray(response)).toEqual(true);
        });
    });
});