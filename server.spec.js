const mongoose = require('mongoose');
const express = require('express')
const request = require('supertest')
const app = express();
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

  beforeEach(() => {
    const newGame = { title: 'mario rpg', genre: 'RPG' };
    expect(newGame.title).toEqual(newGame.title)
    expect(newGame.genre).toEqual(newGame.genre)
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
  });

  afterEach(() => {
    return Game.remove();
  });

  it('runs the tests', () => {});

  // test the POST here
  it('should post and save new game', async () =>{
    const newGame = { title: 'mario rpg', genre: 'RPG' };
    const savedGame = await Game.create(newGame);

    expect(savedGame.genre).toEqual(newGame.genre);
    expect(savedGame.title).toEqual(newGame.title)
  })
  // test the GET here
it('should return all games', async () =>{
const response = await request(app)
.get('/api/games')
const { status, type, body } = response;
expect(status).toEqual(200);
expect(type).toEqual('application/json')
});

  // Test the DELETE here
  it('should delete game', async () => {
    const newGame = { title: 'mario rpg', genre: 'RPG' };
    const deleteGame = await Game.remove(newGame);

    expect(deleteGame.genre).not.toEqual(newGame.genre);
    expect(deleteGame.title).not.toEqual(newGame.title)
  })
});
