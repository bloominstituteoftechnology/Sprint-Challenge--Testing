const mongoose = require('mongoose');
const server = require('./server');
const request = require('supertest');

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

    const game = {
      title: 'Revenge of the Sith',
      genre: 'science fiction',
      releaseDate: 'A long time ago..',
    }
    testingGame = await Game.create(game)
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
  });

  afterEach(() => {
    Game.remove();
  });

  it('runs the tests', () => {});

  // test the POST here

  describe('Post Tests', () => {

    it('returns success status code 201', async () => {
      await request(server)
      .post('/api/games')
      .expect(201);
    })
    it('returns success status code 201', async () => {
      await request(server)
      .post('/api/games', testingGame)
      .expect(201);
    })

  })

  describe('Get Tests', () => {

      it('get an item from the database', async () => {
        await request(server).get('api/games')
        expect(response.body[0].toEqual(testingGame))
      })

      it('Get returns a 201', async () => {
        await request(server)
        .get('api/games')
        .expect(201);
      })


  })


  describe('Delete Tests', () => {
    const deleteGame = testingGame
    it('remove and item', async () => {
      await request(server)
      .delete(`api/games/${deleteGame._id}`);
    })


    it('Remove an item from the database', async () => {
      await request(server)
      .delete('api/games', testingGame)
      .expect(202);
    })


})
  // test the GET here

  // Test the DELETE here
});
