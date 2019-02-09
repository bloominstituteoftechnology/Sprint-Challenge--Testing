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

        afterEach(async () => {
            data.clear();
        });

        test('responds with 200', async () => {
            data.add({
              title: 'Pacman',
              genre: 'Arcade',
              releaseYear: 1980
            });
            const response = await request(server).get(GET_GAMES_ENDPOINT);
            expect(response.status).toBe(200);
        });

        test('responds with json', async () => {
            data.add({
              title: 'Pacman',
              genre: 'Arcade',
              releaseYear: 1980
            });
            const response = await request(server).get(GET_GAMES_ENDPOINT);
            expect(response.type).toMatch(/json/i);
        });

        test('responds with array of teams', async () => {
            data.add({
              title: 'Pacman',
              genre: 'Arcade',
              releaseYear: 1980
            });
            data.add({
              title: 'The Legend of Zelda',
              genre: 'Action-Adventure',
              releaseYear: 1986
            });
            data.add({
              title: 'Sim City',
              genre: 'Simulation',
              releaseYear: 1989
            });
            const response = await request(server).get(GET_GAMES_ENDPOINT);
            expect(response.body).toEqual([
            {
                title: 'Pacman',
                genre: 'Arcade',
                releaseYear: 1980
              },
            {
                title: 'The Legend of Zelda',
                genre: 'Action-Adventure',
                releaseYear: 1986
              },
            {
                title: 'Sim City',
                genre: 'Simulation',
                releaseYear: 1989
              }
            ]);
        });

        test('responds with empty array', async () => {
            const response = await request(server).get(GET_GAMES_ENDPOINT);
            expect(response.body).toEqual([]);
        });

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