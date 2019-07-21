const request = require('supertest');

const server =require('./server.js');
const db = require('../data/dbConfig.js');


describe('server.js', () => {
    it('should set the test env', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });
});

describe('GET /', () => {
    afterEach(async () => {
        await db('games').truncate();
    });

    it('should return 200', async () => {
        const res = await request(server).get('/');
        expect(res.status).toBe(200);
    });

    it('should return JSON', async () => {
        const res = await request(server).get('/');
        expect(res.type).toBe('application/json');
    });

    it('should return api: up', async () => {
        const res = await request(server).get('/');
        expect(res.body).toEqual({ api: 'up and running!'});
    });
});

describe('GET /games', () => {

    afterEach(async () => {
        await db('games').truncate();
    });

    it('should return 200', async () => {
        const res = await request(server).get('/games');
        expect(res.status).toBe(200);
    });

    it('should return games', async () => {
        const res = await request(server).get('/games');
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]); 
    });

    it('should return all games in db', async () => {
        // await db('games').truncate();
        const games = [
            {
                id: 1,
                title: "Pacman",
                genre: "Arcade",
                releaseYear: 1980
            }
        ];

        await db('games').insert(games);

        const res = await request(server).get('/games');
        expect(res.status).toBe(200);
        expect(res.body).toEqual(games);
    });
});