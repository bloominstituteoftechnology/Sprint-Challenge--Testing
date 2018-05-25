const mongoose = require('mongoose');
const server = require('./server');
const request = require('supertest');
const Game = require('./games/Game');

const newGame = new Game({
    title: 'California Games',
    genre: 'Sports',
    releaseDate: 'June 1987'
})

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
  });

  afterEach(() => {
    //   // clear collection.
    return Game.remove();
  });

  it('runs the tests', () => {});
  // test the POST here 
  describe('POST testing', () => {
    it('Should create a new game and add it to the DB', () => {
      request(server)
      .post('api/games')
      .send(newGame)
      .expect('string', /json/)
      .expect(201)
    })
    .catch(err => {
      res
      .status(500)
      .json({ message: 'whoops'})
    })
  })

  // test the GET here

  // Test the DELETE here
});
