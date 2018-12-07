const request = require('supertest');

const server = require('./api/server.js');

describe('server.js', () => {
    describe('get games route', () => {
        it('should return a list of games in an array', async () => {
            const response = await request(server).get('/games');
            expect(Array.isArray(response.body)).toBeTruthy;
        });
        it('should return status 200 with the list', async () => {
            const response = await request(server).get('/games');
            expect(response.status).toBe(200);
        });
        it('should return an empty array if no games have been stored', async () => {
            const response = await request(server).get('/games');
            expect(response.body.length).toBe(2);
        });
    });

    describe('post games route', () => {
        it('should return status 422 if genre is missing', async () => {
            const game = {"title": "Super Mario Bros"}
            const response = await request(server).post('/games').send(game);
            expect(response.status).toBe(422);
        });
        it('should return status 422 if title is missing', async () => {
            const game = {"genre": "action"}
            const response = await request(server).post('/games').send(game);
            expect(response.status).toBe(422);
        });
        it('should return status 201 if info is correct', async () => {
            const game = { "title": "Halo", "genre": "First Person Shooter", "releaseYear": 2000 };
            const response = await request(server).post('/games').send(game);
            expect(response.status).toBe(201);
        });
    });

    describe('get games by id', () => {
        it('should return the information about a single game', async () => {
            const response = await request(server).get(`/games/${id}`);
            expect(response.status).toBe(200);
        });
        it('should return status 404 when a game is not found', async () => {
            const id = 999;
            const response = await request(server).get(`/games/${id}`);
            expect(response.status).toBe(404);
        });
    })

});