const request = require('supertest');
const server = require('../server.js');


describe('server.js', () => {
  describe('index route', () => {
    it('should 404', async () => {
      const expectedStatusCode = 404;
      const response = await request(server).get('/');
      expect(response.status).toEqual(expectedStatusCode);
    });
    it('should respond with warning message ', async () => {
      const response = await request(server).get('/');
      expect(response.body).toEqual(expect.objectContaining({
        errorMessage: expect.stringMatching('You probably want to use a different endpoint')
      }));
    });
  });


  describe('post games route', () => {
    it('should 422 if no body', async () => {
      const expectedStatusCode = 422;
      const response = await request(server).post('/games');
      expect(response.status).toEqual(expectedStatusCode);
    });
    it('should respond with one object in an array', async () => {
      const response = await request(server).post('/games').send({ title: 'Pacman', genre: 'Arcade', releaseYear:1980 });
      expect(response.body).toHaveLength(1);
    });
    it('no dupes', async () => {
      const response = await request(server).post('/games').send({ title: 'Pacman', genre: 'Arcade', releaseYear:1980 });
      expect(response.status).toEqual(405);
    });
    it('should 200 on successful post', async () => {
      const response = await request(server).post('/games').send({ title: 'Pacman1', genre: 'Arcade', releaseYear:1980 });
      expect(response.status).toEqual(200);
    });
    it('release year not required', async () => {
      const response = await request(server).post('/games').send({ title: 'Pacman2', genre: 'Arcade' });
      expect(response.status).toEqual(200);
    });
    it('should respond with updated game list', async () => {
      const response = await request(server).post('/games').send({ title: 'Pacman3', genre: 'Arcade', releaseYear:1980 });
      expect(response.body).toEqual(expect.arrayContaining([{
        id: expect.anything(),
        title: expect.stringMatching('Pacman'),
        genre: expect.stringMatching('Arcade'),
        releaseYear: expect.anything()
      }]));
    });
  });

  describe('get games route', () => {
    it('should respond with array if nothing in storage', async () => {
      await request(server).get('/reset');
      const response = await request(server).get('/games');
      expect(response.body).toHaveLength(0);
    });
    it('should 200', async () => {
      const response = await request(server).get('/games');
      expect(response.status).toEqual(200);
    });
    it('should respond with one object in an array', async () => {
     await request(server).post('/games').send({ title: 'Pacman', genre: 'Arcade', releaseYear:1980 });
     const response = await request(server).get('/games');
      expect(response.body).toHaveLength(1);
    });
    it('should respond with updated game list', async () => {
      await request(server).post('/games').send({ title: 'Pacman1', genre: 'Arcade', releaseYear:1980 });
      const response = await request(server).get('/games');
      expect(response.body).toEqual(expect.arrayContaining([{
        title: expect.stringMatching('Pacman'),
        genre: expect.stringMatching('Arcade'),
        releaseYear: expect.anything(),
        id: expect.anything(),
      }]));
    });
  });
  describe('get games by id route', () => {
    it('should 404 if ID not found', async () => {
      await request(server).get('/reset');
      const response = await request(server).get('/games/1');
      expect(response.status).toEqual(404);
    });
    it('should 200', async () => {
      await request(server).post('/games').send({ title: 'Pacman', genre: 'Arcade', releaseYear:1980 });
      const response = await request(server).get('/games/0');
      expect(response.status).toEqual(200);
    });
    it('should respond with one object in an array', async () => {
     const response = await request(server).get('/games/0');
      expect(response.body).toHaveLength(1);
    });
    it('should respond with updated game list', async () => {
      const response = await request(server).get('/games/0');
      expect(response.body).toEqual(expect.arrayContaining([{
        title: expect.stringMatching('Pacman'),
        genre: expect.stringMatching('Arcade'),
        releaseYear: expect.anything(),
        id: expect.anything(),
      }]));
    });
  });
})