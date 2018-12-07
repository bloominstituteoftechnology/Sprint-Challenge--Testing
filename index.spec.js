const request = require('supertest');
let server = require('./api/server.js');
const knex = require("knex");
const knexConfig = require("./knexfile");
const db = knex(knexConfig.development);

beforeEach(async () => {
    await db("games").truncate();
});

describe('server.js', () => {
    describe('/ route', () => {
        it('should return status code 200', async () => {
            let response = await request(server).get('/');

            expect(response.status).toBe(200);
        });

        it('should return JSON', async () => {
            let response = await request(server).get('/');

            expect(response.type).toBe('application/json');
        });

        it('should return with a body like: { api: "up" }', async () => {
            let response = await request(server).get('/');

            expect(response.body).toEqual({
                api: 'up'
            });
        });
    });

    
});