const request = require('supertest');
const server = require('./api/server');
const knex = require('knex');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const games = require('./gamesModel');

beforeEach(async () => {
  // add code to clear database
  await db('games').truncate();
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

    it('should return status 201 if it does recieve all required fields', async () => {
      let response = await request(server).post('/games').send({ title: 'Pacman', genre: 'Arcade' });
      expect(response.status).toBe(201);

      response = await request(server).post('/games').send({ title: 'Pacman', genre: 'Arcade', releaseYear: '1980' });
      expect(response.status).toBe(201);
    });

    it('should return the id of the inserted game', async () => {
      let response = await request(server).post('/games').send({ title: 'Pacman', genre: 'Arcade' });
      expect(response.body).toEqual([1]);

      response = await request(server).post('/games').send({ title: 'Pacman', genre: 'Arcade', releaseYear: '1980' });
      expect(response.body).toEqual([2]);
    })
  });

  describe('GET /games endpoint', () => {
    beforeEach(async () => {
      // add code to clear database
      await db('games').truncate();
    });
    
    it('should return with status code 200 if successful', async () => {
      await games.insert({ title: 'Pacman', genre: 'Arcade' });
      let response = await request(server).get('/games');
      expect(response.status).toBe(200);
    });

    it('should return an empty array if the are no games in the list', async () => {
      let response = await request(server).get('/games');
      expect(response.body).toEqual([]);
    });

    it('should return the list of games', async () => {
      // needs code to populate db with { title: 'Pacman', genre: 'Arcade' }
      await games.insert({ title: 'Pacman', genre: 'Arcade' });
      let response = await request(server).get('/games');
      expect(response.body.length).toBe(1);
    });

    it('should return the list of games', async () => {
      // needs code to populate db with { title: 'Pacman', genre: 'Arcade', releaseYear: '1980' }
      await games.insert({ title: 'Pacman', genre: 'Arcade', releaseYear: '1980' });
      await games.insert({ title: 'Asteroids', genre: 'Arcade', releaseYear: '1978' });
      response = await request(server).get('/games');
      expect(response.body.length).toBe(2);
    });


  });
});