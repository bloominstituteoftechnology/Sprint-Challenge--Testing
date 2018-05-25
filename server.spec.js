const mongoose = require('mongoose');
const request = require('supertest');
const server = require('./server');

const Game = require('./games/Game');

describe('Games', () => {
  let newGame = {
    title: 'Zelda',
    genre: 'Classic',
    releaseDate: 'Jun 1 1980'
  }

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
  //   // hint - these wont be constants because you'll need to override them.

  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
  });

  afterEach(() => Game.remove())
    //   // clear collection.

  it('runs the tests', () => {});
  
  // test the POST here
  describe('POST', () => {
    it('POST a new game to the database', async () => {
      await request(server)
        .post('/api/games')
        .send(newGame)
        .then(res => {
          expect(res.status).toBe(201)
          expect(res.type).toBe('application/json')
        })
    })
  })

  // test the GET here
  describe('GET', () => {
    it('GET the list of games from database', async () => {
      await request(server)
        .get('/api/games')
        .then(res => {
          expect(res.status).toBe(200)
          expect(res.type).toBe('application/json')

        })
    })
  })

  // Test the DELETE here
  describe('DELETE', () => {
    it('DELETE game from database', async () => {
      const savedGame = await Game.create(newGame)
      await request(server)
        .delete(`api/games/${savedGame._id}`)
        .then(res =>
          expect(res.status).toBe(204))
    })
  })
})
