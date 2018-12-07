const request = require('supertest');
const server = require('./index');

const populateDB = (data) => {};

beforeEach(() => {
  console.log('clearing database');
  // add code to clear database
});

describe('index.js', () => {
  describe('simple response to / endpoint', () => {
    it('should return the right stuff', async () => {
      let response = await request(server).get('/');
      expect(response.status).toBe(200);
    });
  });

  describe('POST to /games endpoint', () => {
    it('should return status 422 if it does not recieve all required fields', async () => {
      let response = await request(server).post('/games');
      expect(response.status).toBe(422);

      response = await request(server).post('/games').send({ title: 'Pacman' });
      expect(response.status).toBe(422);

      response = await request(server).post('/games').send({ genre: 'Arcade' });
      expect(response.status).toBe(422);

      response = await request(server).post('/games').send({ releaseYear: '1980' });
      expect(response.status).toBe(422);
    });

    it('should return status 200 if it does recieve all required fields', async () => {
      let response = await request(server).post('/games').send({ title: 'Pacman', genre: 'Arcade' });
      expect(response.status).toBe(200);

      response = await request(server).post('/games').send({ title: 'Pacman', genre: 'Arcade', releaseYear: '1980' });
      expect(response.status).toBe(200);
    });

    it('should return an array containing all games entered including the last one', async () => {
      let response = await request(server).post('/games').send({ title: 'Pacman', genre: 'Arcade' });
      expect(response.length).toBe(1);

      response = await request(server).post('/games').send({ title: 'Pacman', genre: 'Arcade', releaseYear: '1980' });
      expect(response.length).toBe(2);
    })
  });

  describe('GET /games endpoint', () => {
    it('should return with status code 200 if successful', async () => {
      // needs code to populate db with { title: 'Pacman', genre: 'Arcade' }
      let response = await request(server).get('/games');
      expect(response.status).toBe(200);
    });

    it('should return the list of games', async () => {
      // needs code to populate db with { title: 'Pacman', genre: 'Arcade' }
      let response = await request(server).get('/games');
      expect(response.body).toEqual({ title: 'Pacman', genre: 'Arcade' });
    });

    it('should return the list of games', async () => {
      // needs code to populate db with { title: 'Pacman', genre: 'Arcade', releaseYear: '1980' }
      let response = await request(server).get('/games');
      expect(response.body).toEqual({ title: 'Pacman', genre: 'Arcade', releaseYear: '1980' });
    });

    it('should return an empty array if the are no games in the list', async () => {
      let response = await request(server).get('/games');
      expect(response.body[0]).toEqual([]);
    });
  });
});