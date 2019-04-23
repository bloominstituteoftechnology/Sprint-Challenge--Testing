const server = require('./server.js');
const request = require('supertest');
const db = require('../data/dbConfig.js');


describe('Server tests', () => {

    it('should set testing env', () => {
        const env = process.env.DB_ENV;

        expect(env).toBe('testing');
    });
});

//get tests
describe('GET /games', () => {

    it('should return 200', async () => {
        const res = await request(server).get('/games');
            expect(res.status).toBe(200);
    });

    it('should return JSON', async () => {
        const res = await request(server).get('/games');
            expect(res.type).toBe('application/json');
    });

    it('should return an array even if there are no games', async () => {
        const res = await request(server).get('/games');

            expect(res.body).toEqual([]);
    });
})

//post tests

describe('POST /games', () => {
    it('should return 422 if data is missing', async () => {
        const res = await db('games').insert({
            title: "Pacman",
            ganra: "Arcade",
            releaseYear: 1980
        });

        expect(res.status).toBe(422);
    });
    it('should return 200', async () => {
        const res = await db('games').insert({
            title: "Pacman",
            genre: "Arcade",
            releaseYear: 1980
        });

        expect(res.status).toBe(200);
    });
    it('should return id', async () => {
        const [id] = await db('games').insert({
            title: "Pacman",
            genre: "Arcade",
            releaseYear: 1980
        });

        expect(hobbit.id).toBe(1);
    });
})

// {
//     title: 'Pacman', // required
//     genre: 'Arcade', // required
//     releaseYear: 1980 // not required
//   }