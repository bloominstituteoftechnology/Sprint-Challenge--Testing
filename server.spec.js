const request = require('supertest');
const server = require('./server.js');

const game = {
    title: 'Pacman',
    genre: 'Arcade',
    releaseYear: 1980
};
const incompleteGame = {
    title: 'Pacman'
};

describe('server.js routes', () => {
    describe('POST route', () => {
        it('should return status code 201', async () => {
            const response = await request(server).post('/').send(game);
            expect(response.status).toEqual(201);
        });
        it('should return status code 422 when incomplete info sent', async () => {
            const response = await request(server).post('/').send(incompleteGame);
            expect(response.status).toEqual(422);
        });
        it('should return a JSON object', async () => {
            const response = await request(server).post('/').send(game);
            expect(response.type).toBe('application/json');
        });
    });
    describe('GET route', () => {
        it('should return 200 status code', async () => {
            const response = await request(server).get('/');
            expect(response.status).toEqual(200);
        });
        it('should return an array', async () => {
            const response = await request(server).get('/');
            expect(typeof response.body === 'array').toBeTruthy();
        });
        it('should return a JSON object', async () => {
            const response = await request(server).get('/');
            expect(response.type).toBe('application/json');
        });
    });
});