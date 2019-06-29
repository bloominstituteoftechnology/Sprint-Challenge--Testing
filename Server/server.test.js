const request = require('supertest');
const server = require('./server');

const db = require('../data/dbConfig');

beforeEach(() => {
    return db('games').truncate();
});

describe("SERVER", () => {
    describe('Environment', () => {
        it('should set environment to \'testing\'', () => {
            const env = process.env.DB_ENV;

            expect(env).toBe('testing');
        });

        it('should run on environmental port', () => {
            const port = process.env.PORT;

            expect(port).not.toBe(undefuned);
        });
    });

    describe('GET /', () => {
        it('should return a json package', async () => {
            const res = await request(server).get('/');

            expect(res.type).toBe('application/json');
        });

        it('should return { api: \'Server Running...\' }', async () => {
            const res = await request(server).get('/');

            expect(res.body.api).toBe("Server Running");
        });
    });

    describe('GET /games', () => {
        it('should return a json packet', async () => {
            const res = await request(server).get('/games');

            expect(res.type).toBe('application/json');
        });
    
        it('should return an array', async () => {
            const res = await request(server).get('/games');

            expect(typeof res.body).toBe('object');
        });

        it('should return status 200 OK', async () => {
            const res = await request(server).get('/games');

            expect(res.status).toBe(200);
        });
    });

    describe('POST /games', () => {
        it('should post game to database', async () => {
            const game = { title: 'Insomnia', genre: 'horror', releaseYear: 2016 }

            const res = await request(server).post('/games')
                                             .send(game);
    
            game.id = 1;

            expect(res.body).toEqual(game);
        });

        it('should return status 422 if missing field', async () => {
            const game = { genre: 'action', releaseYear: 2000 }

            const res = await request(server).post('/games')
                                             .send(game);

            expect(res.status).toBe(422);
        });

        it('should return status 201 if successful', async () => {
            const game = { title: 'Cuphead', genre: 'platformer', releaseYear: 2015 }

            const res = await request(server).post('/games')
                                             .send(game);

            expect(res.status).toEqual(201);
        });
    });
});