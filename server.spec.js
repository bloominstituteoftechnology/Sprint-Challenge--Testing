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
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    const game = {
      title: 'Mario Bros',
      genre: 'platform',
      releaseDate: '1983',
    };
    const savedGame = await Game.create(game);
    gameId = savedGame._id;
  });

  afterEach(() => {
    //   // clear collection.
    Game.remove();
  });

  it('runs the tests', () => {});

  // test the POST here
  describe('POST', () => {
    it('should create a new game', async () => {
      request(server)
        .post()
        .send('/api/games')
        .expect('content-type', /json/)
        .expect(201);
    });

    it('should error when a new game POST does not include title or genre', () => {
      const noTitle = { genre: 'platform', releaseDate: '1983' };
      const noGenre = { title: 'Mario Bros', releaseDate: '1983' };

      request(server)
        .post('/api/games')
        .send(noTitle)
        .expect('content-type', /json/)
        .expect(500);

      request(server)
        .post('/api/games')
        .send(noGenre)
        .expect('content-type', /json/)
        .expect(500);
    });
  });

  // test the GET here

  describe('GET', () => {
    it('should return all games from database', async () => {
      request(server)
        .get('/api/games')
        .expect(200)
        .expect(res => res.length === 0);

      const savedGame = await Game.create(Game);
      const anotherGame = await Game.create({
        title: 'Tempest',
        genre: 'Third Person',
        releaseDate: '1981',
      });

      request(server)
        .get('/api/games')
        .expect(200)
        .expect(res => res.length === 2);
    });
  });

  // Test the DELETE here

  describe('DELETE', () => {
    it('should delete an existing game by correct ID', async () => {
      const savedGame = await Game.create(Game);
      
      request(server).delete().expect(204);
    });
    it('should error if an id is not provided on deletion', async () => {
      request(server)
        .delete('/api/games/')
        .expect('content-type', /json/)
        .expect(res => res.message === 'Provide an ID')
        .expect(422);
    })
    it('should error if an invalid id is provided on deletion', async () => {
      request(server)
        .delete('/api/games/:id')
        .expect('content-type', /json/)
        .expect(res => res.message === 'Game not found')
        .expect(404);
    });
  });
});
