const request = require('supertest');

const server = require('./server');

const db = require('../data/dbConfig');

afterEach(async () => {
    await db('games').truncate();
});

describe('Checking /games GET endpoint', () => {
    it('Should return the correct status code', async () => {
        const response = await request(server).get('/games');
        expect(response.status).toBe(200);
    });
    it('Should return a JSON object', async() => {
        const response = await request(server).get('/games');
        expect(response.type).toEqual('application/json'); 
    });
    it('Should return an empty array', async() => {
        const response = await request(server).get('/games');
        expect(response.body).toEqual([]);
    });
});

describe('Checking /games POST endpoint', () => {
    it('POST works when provided an acceptable body', async() => {
        const body = {
            title: 'Pacman',
            genre: 'Nintendo',
            releaseYear: '1980'
        };
        const response = await request(server)
            .post('/games')
            .send(body);
        expect(response.status).toBe(201);
    });
    it('Should return a JSON object', async() => {
        const body = {
            title: 'Pacman',
            genre: 'Nintendo',
            releaseYear: '1980'
        };
        const response = await request(server)
            .post('/games')
            .send(body);
        expect(response.type).toEqual('application/json'); 
    });
    it('Should return an error status when missing required elements', async() => {
        const body = {
            title: 'Pacman'
        };
        const response = await request(server)
            .post('/games')
            .send(body);
        expect(response.status).toBe(422);
    });
});