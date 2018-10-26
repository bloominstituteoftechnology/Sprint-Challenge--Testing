const request = require('supertest');
const getType = require('jest-get-type');
const server = require('./server.js');

const defaultGame = {
    title: 'Pacman',
    genre: 'Arcade',
    releaseYear: 1980
  };


  describe('server.js', () => {
    it('returns status code 200 (OK)', async () => {
        const response = await request(server).get('/');
        expect(response.status).toEqual(200);
    });
    describe('POST /games', () => {
        it('should return status code 422 if no title is provided', async () => {
            let game = { ...defaultGame, title: '' }
            const response = await request(server)
            .post('/games')
            .send(game)
            expect(response.status).toEqual(422);
        });
        it('should return status code 422 if no genre is provided', async () => {
            let game = { ...defaultGame, genre: '' }
            const response = await request(server)
            .post('/games')
            .send(game)
            expect(response.status).toEqual(422);
        });
        it('should return status code 201 if all required fields are provided', async () => {
            let game = { ...defaultGame }
            const response = await request(server)
            .post('/games')
            .send(game)
            expect(response.status).toEqual(201);
        });
        it('should return the provided object', async () => {
            let game = { ...defaultGame, title: 'Atari', releaseYear: 1972 }
            const response = await request(server)
            .post('/games')
            .send(game)
            expect(response.body).toEqual({ title: 'Atari', genre: 'Arcade', releaseYear: 1972 });
        });
        it('should return status code 405 if the title already exists', async () => {
            let game = { ...defaultGame }
            const response = await request(server)
            .post('/games')
            .send(game)
            expect(response.status).toEqual(405);
        });
    });


});