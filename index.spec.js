const request = require('supertest');

const server = require('./server.js');

describe('server', () => {
  describe('Get /games', () => {
    it('the get is getting a status code of 200(OK)', async () => {
      const response = await request(server).get('/games');

      expect(response.status).toBe(200);
    });

    it('the get is recieving an array even if it is empty', async () => {
      const response = await request(server).get('/games');

      expect(response.body).toEqual(expect.arrayContaining([]));
    });

    it('should return json', async () => {
      const response = await request(server).get('/games');

      expect(response.type).toBe('application/json');
    });
  });

  describe('POST /games', () => {
    it('post sends a status of 201(Created)', async () => {
      const newGame = {
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980,
      };

      const response = await request(server)
        .post('/games')
        .send(newGame);

      expect(response.status).toBe(201);
    });

    it('adds a new game into the array', async () => {
      const newGame = {
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980,
      };

      const response = await request(server)
        .post('/games')
        .send(newGame);
      expect(response.body).toEqual(expect.arrayContaining([newGame]));
    });

    it('genre is required', async () => {
      const newGame = {
        title: 'Prince of Persia',
      };

      const response = await request(server)
        .post('/games')
        .send(newGame);

      expect(response.status).toBe(422);
    });

    it('title is required', async () => {
      const newGame = {
        genre: 'Action',
      };

      const response = await request(server)
        .post('/games')
        .send(newGame);

      expect(response.status).toBe(422);
    });
  });

  it('server running', () => {
    expect(true).toBeTruthy();
    expect(false).toBeFalsy();
  });
});
