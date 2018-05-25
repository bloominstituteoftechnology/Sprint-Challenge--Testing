const mongoose = require('mongoose');
const request = require('supertest');
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

  beforeEach(async () => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    const game = {
      title: 'Borderlands 2',
      genre: 'Action, Role-Playing, FPS',
      releaseDate: '2012'
    }
    const savedGame = await request(server).post('/api/games').send(game);
    gameId = savedGame.body._id
    return savedGame;
  });

  afterEach(() => {
    //   // clear collection.
    return Game.remove();
  });

  it('runs the tests', () => {});

  // test the POST here
  it('gets the correctly store the new game to the db', async () => {
    const newBody = {
      __v: 0,
      title: 'Borderlands 1',
      genre: 'Action, Role-Playing, FPS',
    };
    const res = await request(server).post('/api/games').send(newBody);
    gameId = res.body._id;
    const expectedBody = Object.assign({},newBody, { _id: gameId});
    expect(res.status).toEqual(201);
    // expect(res.type).toEqual('application/json');
    expect(res.body).toEqual(expectedBody);
  })

  // test the GET here
  it('gets the correct information from the GET', async () => {
    const presetBody = {
      __v: 0,      
      title: 'Borderlands 2',
      genre: 'Action, Role-Playing, FPS',
      releaseDate: '2012'
    };
    const res = await request(server).get('/api/games');
    const expectedBody = Object.assign({}, presetBody, { _id: res.body[0]._id })
    expect(res.status).toEqual(200);
    expect(res.type).toEqual('application/json');
    expect(res.body).toEqual([expectedBody]);
  })
  // Test the DELETE here
  it('should properly delete the document from the db', async () => {
    const res = await request(server).delete(`/api/games/${gameId}`);
    expect(res.status).toEqual(204);
    expect(res.type).toEqual('');
    expect(res.body).toEqual({});
  })
});
