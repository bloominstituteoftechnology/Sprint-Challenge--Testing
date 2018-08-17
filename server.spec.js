const request = require('supertest');
const server = require('./server');

describe('server.js', () => {
    describe('root endpoint GET(/)', () => {
        it('should return a status code of 200 OK', async () => {
            const response = await request(server).get('/');
            expect(response.status).toBe(200);
        });
        it('should return JSON', async () => {
            const response = await request(server).get('/');
            expect(response.type).toMatch(/json/);
        });
        it('should return an array of objects', async () => {
            const response = await request(server).get('/');
            expect(Array.isArray(response.body)).toBeTruthy();
        });
        it('should check the last object and see if it gets the right amount of properties', async () => {
            const response = await request(server).get('/');
            expect(Object.keys(response.body[response.body.length - 1]).length).toBe(4);
        });
        it('should check the last object to see if the required properties exist', async () => {
            const response = await request(server).get('/');
            const properties = ['id', 'title', 'genre'];
            const lastResponse = response.body[response.body.length - 1];
            properties.forEach(property => {
                expect(lastResponse[property]).toBeDefined();
            });
        });
    });


    const game = {
        title: "Donkey Kong",
        genre: "a genre"
    }
    let id;
    describe('root endpoint POST(/)', () => {
        it('should POST a game', async() => {
            const postResponse = await request(server).post('/').send(game);
            expect(postResponse.body[0]).toBeGreaterThanOrEqual(1);
            id = postResponse.body[0];
        });
    });
});