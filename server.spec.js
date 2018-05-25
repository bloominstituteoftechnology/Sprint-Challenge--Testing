const mongoose = require('mongoose');
const supertest = require('supertest');
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
    const newGame = new Game({
      title: 'Zelda',
      genre: 'Classic',
      releaseDate: 'Jun 1 1980',
    });

    newGame.save((err, savedGame) => {
      if (err) {
        console.log(err);
        done();
      }
      gameID = savedGame._id.toString();
      done();
    });
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
  });

  afterEach(() =>
    Game.remove())
    //   // clear collection.
})

  // test the POST here
describe('POST /api/game/create', () => {
  it('POST a new game to the database', async () => {
    request(server)
      .post('/api/game/create')
      .send(newGame)
      .expect('Content-Type', /json/)
      .expect(201)
  });
})

  // test the GET here
describe('GET /api/game', () => {
  it('GET the list of games from database', async () => {
    request(server)
      .get('/api/game')
      .expect('Content-Type', /json/)
      .expect(200)
  });
})

  // Test the DELETE here
describe('DELETE /api/game/remove/:id', () => {
  it('DELETE game from database', async () => {
    const savedGame = await Game.create(newGame)
    request(server)
      .delete(`api/game/${savedGame._id}`)
      .expect(204)
  })
});
