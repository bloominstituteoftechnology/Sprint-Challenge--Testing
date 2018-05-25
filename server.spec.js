const mongoose = require('mongoose');
const Game = require('./games/Game');
const server = require('./server.js')
const request = require('supertest');

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

  let gameId = "5b084971d57d93a692028836";


  beforeEach(() => {

    return Game.find({})
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
  });

  afterEach(() => {
    return Game.remove()
  });

  it('server is running ', async () => {
    const expected = { msg: "api is running" }
    const response = await request(server).get('/');
    expect(response.body).toEqual(expected);
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');


  });
  it('server is posting ', async () => {
    const obj = { title: "zzzzzzzzzzzz", genre: 'hahahahahah' };
    const savedGame = await Game.create(obj);
    const response = await request(server).get('/api/games');
    const realRespond = response.body.map(game => { return game.title })
    expect(realRespond).toContain(obj.title);
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');


  });
  it('server is deleting  ', async () => {
    await Game.findById({ _id: gameId }).remove()
    const response = await request(server).get('/api/games');
    const realRespond = response.body.map(game => { return game._id })
    expect(realRespond).not.toContain(gameId);
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');


  });

});
