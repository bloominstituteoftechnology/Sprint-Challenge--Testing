const request = require('supertest');

const server = require('./server');
const data = require('../data');

const GAMES_GET_ENDPOINT = '/games';
const GAMES_POST_ENDPOINT = '/games';

describe('server endpoints', () => {

    describe('get /', () => {

        test('responds with 200', async () => {
            const response = await request(server).get('/');
            expect(response.status).toBe(200);
        });

        test('responds with json', async () => {
            const response = await request(server).get('/');
            expect(response.type).toMatch(/json/i);
        });

        test('sends correct response object', async () => {
            const response = await request(server).get('/');
            expect(response.body).toEqual({api: 'active'});
        });

    });

    describe('get /games', () => {

    });

    describe('post /games', () => {
    
        afterEach(() => {
            data.clear();
        });
    
        test('responds with 201', async () => {
            const body = {
              title: 'Pacman',
              genre: 'Arcade',
              releaseYear: 1980
            }
            const response = await request(server).post(GAMES_POST_ENDPOINT).send(body);
            expect(response.status).toBe(201);
        });
    
        test('responds with json', async () => {
            const body = {
              title: 'Pacman',
              genre: 'Arcade',
              releaseYear: 1980
            }
            const response = await request(server).post(GAMES_POST_ENDPOINT).send(body);
            expect(response.type).toMatch(/json/i);
        });
    
        test('responds with id of new team', async () => {
            const body = {
              title: 'Pacman',
              genre: 'Arcade',
              releaseYear: 1980
            }
            const response = await request(server).post(GAMES_POST_ENDPOINT).send(body);
            expect(response.body).toEqual({id: 1});
        });
    
        test('responds with 422 on missing title', async () => {
            const body = {
                genre: 'Arcade',
                releaseYear: 1980
              }
            const response = await request(server).post(GAMES_POST_ENDPOINT).send(body);
            expect(response.status).toBe(422);
        });
    
        test('responds with 422 on missing genre', async () => {
            const body = {
                title: 'Pacman',
                releaseYear: 1980
              }
            const response = await request(server).post(GAMES_POST_ENDPOINT).send(body);
            expect(response.status).toBe(422);
        });

    });

});