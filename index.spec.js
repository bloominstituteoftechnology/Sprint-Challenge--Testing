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

    describe('/games POST route', () => {
        it('should return the correct status code', async () => {
            let response = await request(server).post('/games').send({
                "title": 'Pacman', // required
                "genre": 'Arcade', // required
                "release year": 1980 // not required
              });
            expect(response.status).toBe(200);

            response = await request(server).post('/games').send({
                "title": '', // required
                "genre": 'Arcade', // required
                "release year": 1980 // not required
              });
            expect(response.status).toBe(422);

            response = await request(server).post('/games').send({
                "title": 'Pokemon', // required
                "genre": '', // required
                "release year": 1980 // not required
              });
            expect(response.status).toBe(422);
        });

        it('should return JSON', async () => {
            let response = await request(server).post('/games').send({
                "title": 'Street Fighter', // required
                "genre": 'Arcade', // required
                "release year": 1980 // not required
              });

            expect(response.type).toBe('application/json');
        });

        it('should return with a body like: [1]', async () => {
            let response = await request(server).post('/games').send({
                "title": 'The Simpsons', // required
                "genre": 'Arcade', // required
                "release year": 1980 // not required
              });

            expect(response.body).toEqual([1]);
        });

        it('should reject duplicate titles', async () => {
            let response = await request(server).post('/games').send({
                "title": 'The Simpsons', // required
                "genre": 'Arcade', // required
                "release year": 1980 // not required
              });

            response = await request(server).post('/games').send({
                "title": 'The Simpsons', // required
                "genre": 'Arcade', // required
                "release year": 1980 // not required
            });

            expect(response.status).toEqual(405);
        });
    });

    describe('/games GET route', () => {
        it('should return the correct status code', async () => {
            let response = await request(server).get('/games')
            expect(response.status).toBe(200);
        });

        it('should return JSON', async () => {
            let response = await request(server).get('/games')

            expect(response.type).toBe('application/json');
        });

        it('should return the correct body', async () => {
            let response = await request(server).get('/games')

            expect(response.body).toEqual([]);

            response = await request(server).post('/games').send({
                "title": 'The Simpsons', // required
                "genre": 'Arcade', // required
                "release year": 1980 // not required
              });
            response = await request(server).get("/games")
            expect(response.body).toEqual([{
                "title": 'The Simpsons', // required
                "id": 1,
                "genre": 'Arcade', // required
                "release year": 1980 // not required
              }]);

        });
    });
});