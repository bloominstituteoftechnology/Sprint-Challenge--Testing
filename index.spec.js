const request = require('supertest');
const server = require('./api/server.js');

const title = 'Pacman';
const genre = 'Arcade';
const releaseYear = 1980;

describe('basic server test', () => {

    it('can run tests', () => {
        expect(true).toBeTruthy();
    });
});

describe('POST -- games', () => {

    it('should send status code of 200, if accepted', async () => {
        const response = await request(server).post('/games').send({ title, genre, releaseYear });
        expect(response.status).toBe(200);
    });

    it('should add game and return name', async () => {
        const response = await request(server).post('/games').send({ title, genre, releaseYear });
        expect(response.body).toEqual({ latestAddition: 'Pacman'});
    });

    it('should return type-json', async () => {
        const response = await request(server).post('/games').send({ title, genre, releaseYear });
        expect(response.type).toEqual('application/json');
    });

    it('returns a 422 status code if failed', async () => {
        const response = await request(server).post('/games').send({ title, releaseYear });
        expect(response.status).toEqual(422);
    });

});

describe('GET -- games', () => {

    it('should return a 200 status code', async () => {
        const response = await request(server).get('/games');
        expect(response.status).toEqual(200);
    });

    it('should return a list of games as an array', async () => {
        const expected = [
           {
              "genre": "test",
              "releaseYear": 1,
              "title": "test",
            },
             {
              "genre": "Arcade",
              "id": 0,
              "releaseYear": 1980,
              "title": "Pacman",
            },
             {
              "genre": "Arcade",
              "id": 1,
              "releaseYear": 1980,
              "title": "Pacman",
            },
             {
              "genre": "Arcade",
              "id": 2,
              "releaseYear": 1980,
              "title": "Pacman",
            }];
        const response = await request(server).get('/games');
        expect(response.body).toEqual(expected);
    });

    it(`should return type-json`, async () => {
        const response = await request(server).get('/games');
        expect(response.type).toEqual('application/json');
    });
});