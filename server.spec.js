const request = require('supertest');

const server = require('./server.js');

describe('server.js', () => {
  describe('GET /api/games', async () => {
    it('should return status code 200 OK', async () => {
      const expected = 200;

      const response = await request(server).get('/api/games');

      expect(response.status).toEqual(expected);
    });

    // GET

    it('should return a list of games', async () => {
      const expected = server.games;

      const res = await request(server).get('/api/games')

      expect(res.body).toEqual(expected);
    });

    it('should return an empty list if there are no games in the server', async () => {
      const expected = [];

      const res = await request(server).get('/api/games')

      expect(res.body).toEqual(expected);
    });

    // POST

    describe('POST /api/games'), () => {
      it('should return a 422 code if the information is incomplete', async () => {
        const expected = 422;

        const response = await request(server).post('/api/games').send({title: "", genre: "Arcade",  releaseYear: 1980});

        expect(response.status).toEqual(expected);
      });

      it('should return a 200 code if the information is complete', async () => {
        const expected = 200;

        const response = await request(server).post('/api/games').send({title: "Pacman", genre: "Arcade",  releaseYear: 1980});

        expect(response.status).toEqual(expected);
      })
    }
  })
})