const request = require('supertest');
const server = require('./api/server');

describe('server', () => {

  describe('GET /games', () => {
    it('should return status code 200', async () => {
      const response = await request(server).get('/games');
      expect(response.status).toBe(200);
    }); // 200

    it('should return JSON', async () => {
      const response = await request(server).get('/games');
      expect(response.type).toBe('application/json');
    }); // json

    it('should return an array', async () => {
      const response = await request(server).get('/games');
      expect(Array.isArray(response.body)).toBe(true);
    });

  }); // get

  describe('POST /games', () => {
    it('should add game', async () => {
      const title = "Pacman";
      const genre = "Arcade";
      const releaseYear = 1980;
  
      const expected = { title: "Pacman", genre: "Arcade", releaseYear: 1980 };
      const response = await request(server).post('/games').send({title, genre,releaseYear});
      expect(response.body[0]).toEqual(expected);
    });

    it('should return 200 if a new game is posted successfully', async () => {
      const newGame = {
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: '1980'
      };
      const response = await request(server).post('/games').send(newGame);
      expect(response.status).toBe(200);
    }); // 200

    it('should return 422 if missing info', async () => {
      const newGame = {
        title: 'Pacman',
        releaseYear: '1980'
      };
      const response = await request(server).post('/games').send(newGame);
      expect(response.status).toBe(422);
    })

  }); // post


}); // server