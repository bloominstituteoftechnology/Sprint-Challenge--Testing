
const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {

  describe('GET /games', () => {
    it('should return status code 200', async () => {
        const response = await request(server).get('/games');
        expect(response.status).toEqual(200);
    });

    it('should respond with an array', async () => {
        const response = await request(server).get('/games');
        expect(Array.isArray(response.body)).toBeTruthy();
    });
  });


  describe('POST /games', () => {
    it('responds with status code 422 when incomplete info is sent', async () => {
        let game = {
            title: 'Pacman',
            releaseYear: 1980
        }
        
        const response = 
            await request(server)
                .post('/games')
                .send(game)
                .set('Accept', 'application/json');

            expect(response.status).toEqual(422);
    });

    it('responds with status code 201 when game is posted and the game itself', async () => {
        
        const response =
            await request(server)
                .post('/games')
                .send({title: 'Pacman', genre: 'Arcade', releaseYear: 1980});

        expect(response.status).toEqual(201);
        expect(response.body).toEqual({title: 'Pacman', genre: 'Arcade', releaseYear: 1980});
    });

  });


});