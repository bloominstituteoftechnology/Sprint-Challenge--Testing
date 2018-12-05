const request = require('supertest');
const server = require('./server');

describe('server.js', () => {
    it('runs tests', () => {
        expect(true).toBeTruthy();
    })
     // runs tests
    describe('**POST /games***', () => {
    it('should post a game', async () => {
        const title = 'Pacman';
        const genre = 'Arcade';
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

    it('should return a 200 code if a new game is posted successfully', async () => {
        const newGame = {
          title: 'Donkey Kong',
          genre: 'Arcade',
          releaseYear: '1981'
        };
        
        const response = await request(server)
        .post('/games')
        .send(newGame);
        expect(response.status).toBe(200);
      }); // should return a 200 code if a new game is posted successfully
    }); // post /games

    describe('**GET /games**', () => {
        it('should return games', async () => {
            const response = await request(server)
            .get('/games');
            expect(response.type).toBe('application/json');
        }); // list of fames
        
    }) // get /games
}) // server.js