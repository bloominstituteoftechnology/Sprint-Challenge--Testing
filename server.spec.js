const mongoose = require('mongoose');
const Game = require('./games/Game');
const server = require('./server');
const request = require('supertest');

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
    const newGame = new Game({
      title: 'Overwatch',
      genre: 'pewpew',
      releaseDate: 'May 24, 2016',
    })

    newGame.save((err, savedGame) => {
      if (err) {
        console.log(err);
      } else {
        gameId = savedGame.id;
        console.log(gameId);
      }
    })

  });

  afterEach(() => {
    //   // clear collection.
    return Game.remove({}, err => {
      if(err) {
        console.log('Error removing game');
      } else {
        console.log('Game removed');
      }
    })
  });

  it('runs the tests', () => {});

  // test the POST here
  it('Post', async() => {
    const game = {
      title: 'Overwatch',
      genre: 'pewpew',
      releaseDate: 'May 24, 2016',
    }

    const response = await request(server)
      .post('./api/games')
      .send(game);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("title");
      expect(response.body).toHaveProperty("genre");
      // releaseDate is NOT required. skip the test.
      expect(response.body.title).toEqual('Overwatch');
      expect(response.body.genre).toEqual('pewpew');
  });

  // test the GET here

  // Test the DELETE here
});
