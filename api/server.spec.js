const request = require('supertest');

const server = require('./server');

const db = require('../data/dbConfig');

describe('the route handlers', () => {
    describe('get /games', () => {
        //check status code 200
        it('responds with 200', async () => {
            const response = await request(server).get('/games');
            expect(response.status).toBe(200);
        });
    })

})