const request = require('supertest');

const server = require('./gameRouter');
const data = require('../data');

describe('game router endpoints', () => {

    describe('get /games', () => {

    });

    describe('post /games', () => {
    
        afterEach(() => {
            data = [];
        });
    
        test('responds with 201', async () => {
            const body = {
              title: 'Pacman',
              genre: 'Arcade',
              releaseYear: 1980
            }
            const response = await request(server).post(POST_ENDPOINT).send(body);
            expect(response.status).toBe(201);
        });
    
        test('responds with json', async () => {
            const body = {
              title: 'Pacman',
              genre: 'Arcade',
              releaseYear: 1980
            }
            const response = await request(server).post(POST_ENDPOINT).send(body);
            expect(response.type).toMatch(/json/i);
        });
    
        test('responds with id of new team', async () => {
            const body = {
              title: 'Pacman',
              genre: 'Arcade',
              releaseYear: 1980
            }
            const response = await request(server).post(POST_ENDPOINT).send(body);
            expect(response.body).toEqual({id: 1});
        });
    
        test('responds with 422 on missing title', async () => {
            const body = {
                genre: 'Arcade',
                releaseYear: 1980
              }
            const response = await request(server).post(POST_ENDPOINT).send(body);
            expect(response.status).toBe(422);
        });
    
        test('responds with 422 on missing genre', async () => {
            const body = {
                title: 'Pacman',
                releaseYear: 1980
              }
            const response = await request(server).post(POST_ENDPOINT).send(body);
            expect(response.status).toBe(422);
        });

    });

});