const server = require('./api/server');
const request = require('supertest');

describe('Testing the API', () => {
    describe('get', () => {
        it('sends an array containing a list of games', async () => {
            const response = await request(server).get('/games')
            expect(Array.isArray(response.body)).toBeTruthy();
        })
        it('should send a status code of 200', async () => {
            const response = await request(server).get('/games');
            expect(response.status).toBe(200)
        })
        it('should return 3 for length of list', async () => {
            const response = await request(server).get('/games');
            expect(response.body.length).toBe(3);
        })
    });
    describe('get for id', () => {
        it('should return 404 when id for game is missing', async () => {
            const id = 3243423;
            const response = await request(server).get(`/games/${id}`);
            expect(response.status).toBe(404)
        })
    });
    describe('post', () => {
        it('should return 422 if data is incorrectly sent', async () => {
            const game = {"game": "Goldfish"}
            const response = await request(server).post('/games').send(game);
            expect(response.status).toBe(422);
        });
        it('should return 201 if game is correctly added', async () => {
            const game = {"title": "Monopoly", "genre": "Board", "releaseYear": 2012}
            const response = await request(server).post('/games').send(game)
            expect(response.status).toBe(201);
        })
        it('should return 405 if title is not unique', async () => {
            const game = {"title": "UNO", "genre": "Card", "releaseYear": 1774}
            const response = await request(server).post('/games').send(game)
            expect(response.status).toBe(405);
        })
    })
})