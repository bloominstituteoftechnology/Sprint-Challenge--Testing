const mongoose = require('mongoose');
const request = require('supertest'); //added supertest
const server = require('./server') //added server
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
 
  beforeEach(async () => {
      // write a beforeEach hook that will populate your test DB with data
      // each time this hook runs, you should save a document to your db
      // by saving the document you'll be able to use it in each of your `it` blocks
      game = { title: 'Mad Max', genre: 'action', releaseDate: 'Sept 2015' };
      const newGame = await Game.create(game);
      gameId = newGame._id;
  });

  afterEach(() => {
        // clear collection.
      return Game.remove();
    });
  
//----------------------------------------------------------------------------------------------------------------
  it('runs the tests', () => {});

  // test the POST here
  it('Should POST New Game', async () => {
    const response = await request(server).post('/api/games').send(game);

    expect(response.status).toEqual(201);
    exepct(response.type).toEqual('application/json');
    expect(reponse.body.title).toEqual('Mad Max');
  });

  // test the GET here

  // Test the DELETE here
});
