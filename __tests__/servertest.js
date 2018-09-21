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
    it('should 200 on successful post', async () => {
      const response = await request(server).post('/games').send({ title: 'Pacman', genre: 'Arcade', releaseYear:1980 });
      expect(response.status).toEqual(200);
    });
    it('release year not required', async () => {
      const response = await request(server).post('/games').send({ title: 'Pacman', genre: 'Arcade' });
      expect(response.status).toEqual(200);
    });
    it('should respond with updated game list', async () => {
      const response = await request(server).post('/games').send({ title: 'Pacman', genre: 'Arcade', releaseYear:1980 });
      expect(response.body).toEqual(expect.arrayContaining([{
        title: expect.stringMatching('Pacman'),
        genre: expect.stringMatching('Arcade'),
        releaseYear: expect.anything()
      }]));
    });
  });
})