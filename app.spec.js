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