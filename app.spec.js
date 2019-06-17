const games = require('./db');
const app = require('./app');
const request = require('supertest');

describe('GET/games', () => {
    it('getting 200 status code if works correctly', () => {
        return request(app).get('/games')
            .expect(200)
    });
    it('always returns an array', () => {
        return request(app).get('/games')
            .then(responce => {
                expect(Array.isArray(responce.body)).toBe(true)
            });
    });
});
describe('POST/games', () => {
    it('getting 201 status code if the information is complete', () => {
        const game = { title: 'Pacman', genre: 'Arcade' };
        return request(app)
            .post('/games')
            .send(game)
            .expect(201)
    });
    it('getting 422 status code if genre is missing', () => {
        const game = { title: 'Pacman' };
        return request(app)
            .post('/games')
            .send(game)
            .expect(422)
    });
    it('getting 422 status code if title is missing', () => {
        const game = { genre: "Arcade" };
        return request(app)
            .post('/games')
            .send(game)
            .expect(422)
    });
});