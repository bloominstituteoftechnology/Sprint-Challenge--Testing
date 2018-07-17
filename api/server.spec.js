const mongoose = require('mongoose');
const request = require('supertest');
const server = require('./server');
const Game = require('../games/Game');

describe('The API Server', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='))
      .catch(err => {
        console.log('error connecting to TEST database, is MongoDB running?');
      });
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  let gameId;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(async () => {
    await Game.create({
      title: 'Mario',
      genre: 'Adventure',
      releaseDate: 'May 1980'
    });

    await Game.create({
      title: 'PacMan',
      genre: 'Arcade',
      releaseDate: 'June 1981'
    })
  });

  afterEach(async () => {
    //   // clear the games collection.
    await Game.remove();

  });


  it('has a GET / endpoint', async () => {
    await request(server)
        .get('/api/games')
        .expect(200)
  })

  it('has a GET / endpoint that returns 200', async () => {
      await request(server)
          .get('/api/games')
          .expect(200)
  })

  it('returns a list of games', async () => {
      const response = await request(server)
        .get('/api/games')
      const expected = {
        title: 'Mario',
        genre: 'Adventure',
        releaseDate: 'May 1980'
      };
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toMatchObject(expected);
  })

  describe('POST', () => {
    const mario = {
      title: 'Mario',
      genre: 'Adventure',
      releaseDate: 'May 1980'
    };
    const invalidMario = {
      releaseDate: 'May 1980'
    }

    it('should return status 201 after saving game to DB', async () => {
      await request(server)
        .post('/api/games')
        .send(mario)
        .expect(201);
    })

    it('should return status 500 if incomplete data is given', async () => {
      await request(server)
        .post('/api/games')
        .send(invalidMario)
        .expect(500)
    })

    it('should return game data when successfully posted to DB', async () => {
      const response = await request(server)
        .post('/api/games')
        .send(mario)
      expect(response.body).toMatchObject(mario);
      expect(response.body).toBeTruthy()
    })
  })

  describe('DELETE', () => {
    it('should return a status 204 after successful delete', async () => {
      const mario = await Game.create({
        title: 'Mario',
        genre: 'Adventure',
        releaseDate: 'May 1980'
      })
      
      await request(server)
        .delete(`/api/games/${game._id}`)
        .expect(204)
    })

    it('should return a status 404 if game does not exist', async () => {
      const game = await Game.create({
        title: 'Mario',
        genre: 'Adventure',
        releaseDate: 'May 1980'
      })
      await request(server)
        .delete(`/api/games/${game._id}`)

      await request(server)
        .delete(`/api/games/${game._id}`)
        .expect(404);
    })
  })

});
