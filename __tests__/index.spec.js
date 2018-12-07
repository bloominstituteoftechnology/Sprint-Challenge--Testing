const request = require('supertest');

const server = require('../api/server.js');

describe('server.js', () => {

  describe('/ route', () => {
    it('should return status code 200', async () => {
      let response = await request(server).get('/')
      expect(response.status).toBe(200);
    })

    it('should return application/json', async () => {
      let response = await request(server).get('/')
      // RED TEST: expect(response.type).toBe('application/xml');
      expect(response.type).toBe('application/json');
    })

    it('should return a JSON object from the index route', async () => {
      const expectedBody = { api: 'Ready!' };
        // RED TEST: const expectedBody = { api: 'up' };
      const response = await request(server).get('/');
      expect(response.body).toEqual(expectedBody);
    })
  })

  describe('POST /games endpoint', () => {
    it('should add title, genre, and releaseYear', async () => {
      let response = await request(server)
        .post('/games')
        .send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 })

      expect(response.body).toEqual({ added: 'Arcade: Pacman (1980)'})

      response = await request(server)
      .post('/games')
      .send({ title: 'Pole Position', genre: 'Arcade' })

      expect(response.body).toEqual({ added: 'Arcade: Pole Position (undefined)'})

      response = await request(server)
      .post('/games')
      .send({ title: 'Pharaoh', genre: 'Strategy/Simulation', releaseYear: 1999 })
      // RED TEST: .send({ title: 'Pharaoh', releaseYear: 1999 }) // received 422 error from middleware

      expect(response.body).toEqual({ added: 'Strategy/Simulation: Pharaoh (1999)'})
    })
  })

  describe('GET /allGames endpoint', () => {
    it('should return status code 200', async () => {
      let response = await request(server)
        .get('/allGames')

        expect(response.status).toBe(200);
        // RED TEST: received 404
    })

    it('should return application/json', async () => {
      let response = await request(server).get('/allGames')
      // expect(response.type).toBe('application/xml');
      expect(response.type).toBe('application/json');
    })

    it('should return a JSON object from /allGames', async () => {
      const expectedBody = { message: 'list of games' };
      // const expectedBody = { message: "you can't play today" };
      const response = await request(server).get('/allGames');
      expect(response.body).toEqual(expectedBody);
    })
  })

// all title, genre, and releaseYear for all games
  // - write tests to verify that the endpoint returns the correct HTTP status code when receiving correct and incorrect game data.
})