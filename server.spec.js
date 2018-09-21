const request = require('supertest');
const getType = require('jest-get-type');
const server = require('./server.js');

const defaultGame = {
    title: 'Pacman',
    genre: 'Arcade',
    releaseYear: 1980
  };

describe('server.js', () => {
    it('returns a 200 (OK) status code', async () => {
        const response = await request(server).get('/');

        expect(response.status).toEqual(200);
    });

    describe('POST /games', () => {
        it('should return a 422 status code if no title is provided', async () => {
            let game = { ...defaultGame, title: '' }

            const response = await request(server)
            .post('/games')
            .send(game)

            expect(response.status).toEqual(422);
        });
        it('should return a 422 status code if no genre is provided', async () => {
            let game = { ...defaultGame, genre: '' }

            const response = await request(server)
            .post('/games')
            .send(game)

            expect(response.status).toEqual(422);
        });
        it('should return a 201 status code if all required fields are provided', async () => {
            let game = { ...defaultGame }

            const response = await request(server)
            .post('/games')
            .send(game)

            expect(response.status).toEqual(201);
        });
        it('should return the provided object', async () => {
            let game = { ...defaultGame }

            const response = await request(server)
            .post('/games')
            .send(game)

            expect(response.body)
            .toEqual({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });
        });
    });

    describe('GET /games', () => {
        it('should return a 200 status code', async () => {
            const response = await request(server).get('/games');
    
            expect(response.status).toEqual(200);
        });
        it('should return an array in the response body', async () => {
            const response = await request(server).get('/games');
    
            const type = getType(response.body);
            expect(type).toEqual('array');
        });
        it('should return an array of games', async () => {
            const response = await request(server).get('/games');
            const expected = [
                {
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                },
                {
                    title: 'Atari',
                    genre: 'Arcade',
                    releaseYear: 1972
                }
              ]
            expect(response.body).toEqual(expected);
        });
    });

});