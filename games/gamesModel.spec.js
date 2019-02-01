const request = require('supertest');
const db = require('../data/dbConfig');
const gamesModel = require('./gamesModel');

afterEach(async () => {
  await db('gameTable').truncate();
});

describe('Game model', () => {
  it('Should insert provided game', async () => {
    const myGame = await gamesModel.insert({
      title: 'FIFA',
      genre: 'Sports',
      releaseYear: 2010
    });
    const games = await gamesModel.getAll();
    expect(games).toHaveLength(1);
    expect(games[0].title).toEqual('FIFA');
  });
});
