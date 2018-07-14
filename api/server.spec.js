const request = require('supertest');
const server = require('./server');
const mongoose = require('mongoose');
const Game = require('../games/Game');

describe('The API Server', () => {
  beforeAll(async () => {
    await mongoose
      .connect('mongodb://localhost/test')
      .then(() => {})
      .catch(err => {
        console.log('error connecting to TEST database, is MongoDB running?');
      });
  });

  afterAll(async () => {
    await mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  let gameId;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(async () => {
    await Game.create({
      title: 'Hollow Knight',
      genre: 'Metroidvania',
      releaseDate: 'June 2018',
    });

    await Game.create({
      title: 'Ocotopath Traveler',
      genre: 'JRPG',
      releaseDate: 'July 2018',
    })
  });

  afterEach(async () => {
    await Game.remove();
  });

  it('runs the tests', () => {});

  describe('GET', () => {
    it('should successfully return a status 200', async () => {
      await request(server)
        .get('/api/games')
        .expect(200)
    })
    it('should return a list of games', async () => {
      const response = await request(server).get('/api/games')
      const expected = {
        title: 'Hollow Knight',
        genre: 'Metroidvania',
        releaseDate: 'June 2018',
      }
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toMatchObject(expected);
    })
  })

  describe('POST', () => {
    const validGame = {
      title: 'Pokemon',
      genre: 'JRPG',
      releaseDate: 'i dont remember lol',
    };
    const badGame = {
      releaseDate: 'July 2018'
    }

    it('should successfully return status 201', async () => {
      await request(server)
        .post('/api/games')
        .send(validGame)
        .expect(201);
    })

    it('should return status 500 if invalid data is given', async () => {
      await request(server)
        .post('/api/games')
        .send(badGame)
        .expect(500)
    })

    it('should return the game that was posted', async () => {
      const response = await request(server)
        .post('/api/games')
        .send(validGame)
      expect(response.body).toMatchObject(validGame);
      expect(response.body).toBeTruthy()
    })
  })

  describe('DELETE', () => {
    it('should successfully return a status 204', async () => {
      const game = await Game.create({
        title: "Super Mario",
        genre: 'Platformer',
        releaseDate: 'N/A'
      })
      await request(server)
        .delete(`/api/games/${game._id}`)
        .expect(204)
    })

    it('should return a status 404 if game does not exist', async () => {
      const game = await Game.create({
        title: "Super Mario",
        genre: 'Platformer',
        releaseDate: 'N/A'
      })
      await request(server)
        .delete(`/api/games/${game._id}`)

      await request(server)
        .delete(`/api/games/${game._id}`)
        .expect(404);
    })
  })

  describe('PUT', () => {
    const modified = {
      title: 'Hollow Knight',
      genre: 'Platformer',
      releaseDate: 'July 2018'
    }
    it('should successfully return a status of 200', async () => {
      const response = await request(server).get('/api/games')
      const game = response.body[0]
      await request(server)
        .put(`/api/games/${game._id}`)
        .send(modified)
        .expect(200)
    })
    it('should return a status of 404 if game does not exist', async () => {
      const response = await request(server).get('/api/games')
      const game = response.body[0]
      await request(server).delete(`/api/games/${game._id}`)
      await request(server)
      .put(`/api/games/${game._id}`)
      .send(modified)
      .expect(404)
    })
    it('should return a status of 500', async () => {
      const id = '5b4a435988a2ca366e40aa8'
      await request(server)
      .put(`/api/games/${id}`)
      .send(modified)
      .expect(500)
    })
  })
});
