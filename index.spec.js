const request = require('supertest');
const server = require('./server');

describe('server.js', () => {
    it('runs tests', () => {
        expect(true).toBeTruthy();
    }) // runs tests
    describe('post /games', () => {
    it('should post a game', async () => {
        const title = "Pacman";
        const genre = "Arcade";
        const releaseYear = 1980;
        const expected = { message: 'Pacman Arcade from 1980 has been added!' };

        const response = await request(server)
        .post('/games')
        .send({title, genre, releaseYear});
        expect(response.body).toEqual(expected);
      }); // should post a game
    it('should return a 422 code if information missing', async () => {
        const newGame = {
            title: 'Tekken',
            releaseYear: '1994'
        };
        
        const response = await request(server)
        .post('/games')
        .send(newGame);
        expect(response.status).toBe(422);
    }); // should return a 422 code if information missing
    }) // post /games
}) // server.js