const mongoose = require('mongoose');
const request = require('supertest');

const Game = require('./games/Game');
const server = require('./server');

// ______________VARIABLES______________
let gameId;
let game;
let idToDelete;

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


  // // hint - these wont be constants because you'll need to override them.

  beforeEach( async () => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    game = {
      title: 'Total War: WARHAMMER II',  // required
      genre: 'Strategy Games',  // required
      releaseDate: 'Sep 28, 2017',  // not required
    }
    gameId = await Game.create(game);
    idToDelete = gameId._id;
  });

  afterEach(() => {
    //   // clear collection.
    return Game.remove({}, function (err) {
      console.log('Database cleared');
    });
  });

  it('runs the tests', async () => {
    let response;
  // test the POST here
    game = {
      title: 'Total War: WARHAMMER',  // required
      genre: 'Strategy Games',  // required
      releaseDate: 'May 24, 2016',  // not required
    }

    response = request(server)
      .post('/api/games')
      .send(game)
      .expect(201);

    expect(response._data.title).toEqual(game.title);
    expect(response._data.genre).toEqual(game.genre);
    expect(response._data.releaseDate).toEqual(game.releaseDate);

  // test the GET here
    response = await request(server).get('/api/games');
    expect(response.status).toEqual(200);

  // Test the DELETE here
    response = await request(server).get('/api/games');
    const testLength = response.body.length;

    await request(server)
      .del(`/api/games/${idToDelete}`)
      .expect(204);
      
    response = await request(server).get('/api/games');
    expect(response.body.length).toEqual(testLength-1);

  });
});
