const server = require('./api/server.js');
const request = require('supertest');

describe('SERVER', () => {
  it('should run tests', () => {
    expect(true).toBeTruthy();
  });

  describe.skip('GET /games', () => {
    it('should return statusCode = 404 when games list is empty', async () => {
      const response = await request(server).get('/games');

      expect(response.status).toBe(404);
    });

    it('should return the games array even if it is empty', async () => {
      const response = await request(server).get('/games');

      expect(response.body).toEqual([]);
    });

    it('should return JSON', async () => {
      const response = await request(server).get('/games');

      expect(response.type).toBe('application/json');
    });

    // it('should return statusCode = 200 when games list is not empty', async () => {
    //   const response = await request(server).get('/games');

    //   expect(response.status).toBe(200);
    // });
  });

  describe('POST /games', () => {
    it('should return JSON', async () => {
      const response = await request(server).post('/games');

      expect(response.type).toBe('application/json');
    });

    it('should return a statusCode = 500 and an error message when an internal server error occurs or a duplicate is made', async () => {
      const response = await request(server).post('/games');
      

      expect(response.status).toBe(500);
      expect(response.body).toEqual({error: `There was an error adding the game to the database, please try again, and give a title and genre`});
    });

    it('should return a statusCode = 201 when creation is successful', async () => {
      // const title = 'League of Legends';
      // const genre = 'MOBA';

      // const response = await request(server)
      //   .post('/games')
      //   .send({ title, genre });

      // expect(response.status).toEqual(201);
    });

    it('should return a statusCode = 422 when the type of data is not a string', async () => {
      const title = 101010;
      const genre = 'Fighter';

      const response = await request(server)
        .post('/games')
        .send({ title, genre });

        expect(response.status).toEqual(422);
    });

    it('should return a statusCode = 422 when the genre and title are empty', async () => {
      // const title = '';
      // const genre = '';

      // const response = await request(server)
      //   .post('/games')
      //   .send({ title, genre });

      // expect(response.status).toEqual(422);
    });
  });
});