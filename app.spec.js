const games = require('./db');
const app = require('./app');
const request = require('supertest');

describe('GET/games', () => {
    it('getting 200 status code if works correctly', () => {
        return request(app).get('/games')
            .expect(200)
    });
});