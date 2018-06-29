const mongoose = require('mongoose');

const Game = require('./games/Game');
const server = require('./server');
const request = require('supertest')


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

  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    const superMarioOdyssey = { title: 'Super Mario Odyssey', genre: 'Action/Platformer', releaseDate: '29/Dec/2017' }
    const savedGame = await Game.create(superMarioOdyssey);
  });

  afterEach(() => {
    //   // clear the games collection.
    return Game.remove();
  });

  describe('post to /api/games', async () = {
    const geow = {
      title: 'Gears of War 4',
      genre: 'Cover Shooter',
      releaseDate: '03/04/2017'
    };

    const response = await request(server)
      .post('api/games')
      .send(geow)

      expect(response.status).toBe(201)
  })
