const request = require('supertest');
const mongoose = require('mongoose');

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

  const game = {
    title: 'Black Desert Online',
    genre: 'Fantasy',
    releaseDate: 'July 2016'
  };
  
  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    Game.create(game, (err, savedGame) => {
      if(err) return err;
      gameId = savedGame._id;
      console.log('\n=== game added to test db ===');
    });
  });

  afterEach(() => {
    //   // clear collection.
    Game.remove().then(console.log('\n=== game deleted from test db ==='));
  });

  it('runs the tests', () => {});

  // test the POST here
  describe('[POST] /api/games', () => {
    it('take in and object without throwing error', async () => {
      const response = await request(server).post("/api/games").send(game);
      const { title, genre, releaseDate } = response.body;

      expect(response.status).toEqual(201);
      expect(response.type).toEqual("application/json");
    });

  });
  

  // test the GET here
  describe('[GET] /api/games', () => {

  })
  
  // Test the DELETE here
  describe('[DELETE] /api/games/:id', () => {

  });
 
});
