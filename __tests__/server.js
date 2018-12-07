const request = require('supertest');

const server = require('../api/server.js');

const db = require('../data/dbConfig.js');

describe('server.js', () => {
    describe('/ endpoint', () => {
        it('[GET] - should return status 200', async () => {
            let response = await request(server).get('/');
            expect(response.status).toBe(200);
        });

        it('[GET] - should return json object', async () => {
            let response = await request(server).get('/');
            expect(response.type).toBe('application/json');
        });

        it('[GET] - should return {api: \'up and running\'}', async () => {
            let response = await request(server).get('/');
            expect(response.body).toEqual({api: 'up and running!'});
        });
    });
});