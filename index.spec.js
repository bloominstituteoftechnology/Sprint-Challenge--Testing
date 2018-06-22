const mongoose = require('mongoose');
const Game = require('./games/Game');
const request = require('supertest');
const server = require('./api/server');


describe('The API Server', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='))
      .catch(err => {
        console.log('error connecting to TEST database, is MongoDB running?');
      });
  });

  /*afterAll(() =>    {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });*/

  let gameId = {title:"A", genre: "B" };
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
  });

  /*afterEach(() => {
    //   // clear the games collection.
    return Game.remove();
  });*/

  it('runs the tests', async() => {
    // test the POST here
    let gameId = {title:"a", genre: "b" };

    const newGame = await request(server).post('/api/games').send(gameId);

    expect(newGame.body.title).toEqual('a');
    expect(newGame.genre).not.toEqual('c');
  });

  it('should get game', async () => {
    let expectedBody = { title: 'z', genre: 'y' }
    const newGame = await request(server).post('api/games').send(expectedBody);
    const getGame = await request(server).get('/api/games').send(expectedBody);
  
    expect(newGame.body.title).toEqual('z');
  });

  it('should delete game', async () => {
    let expectedBody = { title: 'd', genre: 'e' }
    const newGame = await request(server).post('/api/games').send(expectedBody);
    const deleteGame = await request(server).delete(`/api/games/${newGame.body._id}`).send(expectedBody);
  
    expect(newGame.body.title).not.toEqual('e');
  });

});
