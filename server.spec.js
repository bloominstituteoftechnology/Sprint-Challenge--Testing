const mongoose = require('mongoose');
const request = require('supertest');
const server = require('./server');
const Game = require('./games/Game');

describe('Games', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='));
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });
  let gameId;
  beforeEach(done => {
    const newGame = new Game ({title: 'Super Mario RPG', genre: 'RPG', releaseDate: '1999' });
    newGame.save((err, savedGame) => {
      if (err) {
        console.log(err);
      } else {
        gameId = savedGame._id;
        console.log(gameId);
      }
      done();
    });
  });

  afterEach(() => {
    return Game.remove();
  });

  // test the POST here 
  describe('server POST routes', () => {
    it('should add a new game', async () => {
      const game = { title: 'Super Mario', genre: 'Platformer', releaseDate: '1989'  };
      const response = await request(server)
        .post('/api/games')
        .send(game);
      expect(response.status).toEqual(201);
      expect(response.type).toEqual('application/json');
      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('genre');
    });
    it('should not allow to add game without title', async () => {
      const game = { genre: 'Platformer', releaseDate: '1989' };
      const response = await request(server)
        .post('/api/games')
        .send(game);
      expect(response.status).toEqual(500);
      expect(response.type).toEqual('application/json');
      expect(response.body.message).toEqual('Error saving data to the DB');
    });
  });
  

  // test the GET here
  describe('server GET route', () => {
    it('should display all games', async () => {
      const response = await request(server).get('/api/games');
      expect(response.status).toEqual(200);
      expect(response.type).toEqual('application/json');
      expect(response.body[0]).toHaveProperty('_id');
      expect(response.body[0]).toHaveProperty('title');
      expect(response.body[0]).toHaveProperty('genre');
      expect(response.body.message).not.toEqual(
        'Something really bad happened'
      );
    });
    it('should show404 with wrong path', async () => {
      const response = await request(server).delete(`/api/wtf`);
      expect(response.status).toEqual(404);
    });
  });

  // Test the DELETE here
  describe('server DELETE route', () => {
    it('should remove game with id', async () => {
      const response = await request(server).delete(`/api/games/${gameId}`);
      expect(response.status).toEqual(204);
    });
    it('should show error if wrong id', async () => {
      const response = await request(server).delete(`/api/games/noid`);
      expect(response.status).toEqual(500);
    });
  });
});
