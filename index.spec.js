const server = require('./api/server.js');
const request = require('supertest');

describe('API testing', () => {
    describe('GET', () => {
        it('should send a list of games in an array', async () => {
            const response = await request(server).get('/games');
            expect(Array.isArray(response.body)).toBe(true);
        });

        it('should send a status of 200', async () => {
            const response = await request(server).get('/games');
            expect(response.status).toBe(200);
        });

        it('should return a list of games with the length of 3', async () => {
            const response = await request(server).get('/games');
            expect(response.body.length).toBe(3);
        });
    });

    describe('POST', () => {
        it('should return an error of 422 if the right data is not sent to API', async () => {
            const game = {"game": "Battleship"}
            const response = await request(server).post('/games').send(game);
            expect(response.status).toBe(422);
        });

        it('should return a status of 201 if game is added correctly', async () => {
            const game = {"title": "Battleship", "genre": "Board", "releaseYear": 1967};
            const response = await request(server).post('/games').send(game);
            expect(response.status).toBe(201);
        });

        it('should return an id as a number once successfully posted', async () => {
            const game = {"title": "hid-n-seek", "genre": "Group", "releaseYear": 605};
            const response = await request(server).post('/games').send(game);
            expect(response.body.newUser.id).toEqual(expect.any(Number));
        });

        it('should return a 405 since the game title is not unique', async () => {
            const game = {"title": "NFL Blitz", "genre": "N64", "releaseYear": 2000};
            const response = await request(server).post('/games').send(game);
            expect(response.status).toBe(405);
        })
        
    });
});