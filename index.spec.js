const request = require('supertest');
const server = require('./api/server.js');

describe('server.js', () => {
  /////////////////////////////////////////////////
  // R O O T   R O U T E
  /////////////////////////////////////////////////

  describe('root route', () => {
    it('should send back a 200', async () => {
      let response = await request(server).get('/');
      expect(response.status).toBe(200);
    });

    it('should return JSON', async () => {
      let response = await request(server).get('/');
      expect(response.type).toBe('application/json');
    });
  });

  /////////////////////////////////////////////////
  // P O S T   R O U T E
  /////////////////////////////////////////////////

  describe('post route', () => {
    // validate that the required fields are included inside the body. If the information is incomplete, return a 422 status code.
    it('should return a 422 if required fields are blank', async () => {
      let response = await request(server)
        .post('/games')
        .send({ title: '', genre: '', releaseYear: 1986 });
      expect(response.status).toBe(422);
    });

    // write tests to verify that the endpoint returns the correct HTTP status code when receiving correct and incorrect game data.
    it('should return a 201 upon successful submission', async () => {
      let response = await request(server)
        .post('/games')
        .send({ title: 'Maniac Mansion', genre: 'Puzzle', releaseYear: 1988 });
      expect(response.status).toBe(201);
    });

    it('should return a 422 upon unsuccessful submission', async () => {
      let response = await request(server)
        .post('/games')
        .send({ title: 22, genre: 44 });
      expect(response.status).toBe(422);
    });
  });
  /////////////////////////////////////////////////
  // G E T   R O U T E
  /////////////////////////////////////////////////
  describe('get route', () => {
    // The GET /games endpoint should return a list of games and HTTP status code 200.
    it('returns status 200 upon retrieval of game list', async () => {
      let response = await request(server).get('/games');
      expect(resonse.status).toBe(200);
    });

    // ensure endpoint returns an array, regardless of list
    it('returns an array, even if game list is empty', async () => {
      let response = await request(server).get('/games');
      expect(respsonse.body).toEqual(expect.arrayContaining([]));
    });

    // ensure data is returned in JSON format
    it('should return JSON', async () => {
      let response = await request(server).get('/');
      expect(response.type).toBe('application/json');
    });
  });
});
