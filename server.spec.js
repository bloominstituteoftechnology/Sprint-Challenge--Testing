const mongoose = require('mongoose');
const request = require('supertest');
const server = require('./server')

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

  let gameId, game;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(async() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    game = { title: 'Madden 18', genre: 'Sports', releaseDate: 'June 2017' };
    const savedGame = await Game.create(game);
    gameId = savedGame._id;
  });

  afterEach(() => {
    return Game.remove();
  });


  it('runs the tests', () => {});

  // test the POST here
  it('Should post a game', async() => {
    const game = {
      title: 'Madden 18',
      genre: 'Sports',
      releaseDate: 'June 2017'
    }
    const response = await request(server)
    .post('/api/games')
    .send(game)

    expect(response.body).toHaveProperty('_id')
    expect(response.body).toHaveProperty('title')
    expect(response.body).toHaveProperty('genre')
    expect(response.body).toHaveProperty('releaseDate')
    expect(response.status).toEqual(201)
    expect(response.type).toEqual('application/json')
  })

  // test the GET here
  it('Should get a game from database', async () => {
    const response = await request(server)
    .get('/api/games')
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    expect(response.body[0].title).toEqual('Madden 18');
  })

  // Test the DELETE here
});
