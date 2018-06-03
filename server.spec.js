const mongoose = require('mongoose');
const supertest = require('supertest');
const server = require('./server.js');
const Game = require('./games/Game');
let gameId;

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
      title: 'Game Title',
      id: '4444'
    })
    newGame.save((err, saveGame) => {
      if (err) {
        console.log(err);
      } else {
        gameId = saveGame._id
        console.log(gameId)
      }
    })
  });

  afterEach(() => {
    //   // clear collection.
    return Game.remove()
  });

  it('runs the tests', () => { });

  // test the POST here
  it('should make a game', async() => {
    const game = {
      title: 'Game Title',
      id: '4444'
    }
    const response = await request(server)
    .post('/api/games')
    .send(game)

    expect(response.body).toHaveProperty('title')
    expect(response.body).toHaveProperty('_id')
    expect(response.status).toEqual(201)
  })

  // test the GET here
  it('should get a game', async () => {
    const response = await request(server)
  })

  // Test the DELETE here
  it('should delete a game', () => {

  })
});
