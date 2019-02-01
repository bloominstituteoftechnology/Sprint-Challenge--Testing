const request = require('supertest');
const express = require('express');
const db = require('../data/dbConfig');
const gamesModel = require('./gamesModel');
const server = require('../api/server');

const app = express();

afterEach(async () => {
  await db('gameTable').truncate();
  jest.setTimeout(10000);
});

describe('Game post model', () => {
  it('Should insert provided game', async () => {
    const myGame = await gamesModel.insert({
      title: 'FIFA',
      genre: 'Sports',
      releaseYear: 2010
    });
    const games = await gamesModel.getAll();
    // console.log('MY game', myGame);
    // console.log('Games =', games);
    // console.log('GAME STATUS', myGame.status);
    expect(games).toHaveLength(1);
    expect(games[0].title).toEqual('FIFA');
    expect(games[0].genre).toEqual('Sports');
    expect(games[0].releaseYear).toEqual(2010);
  });

  it('Check status code', async done => {
    const myGame = {
      title: 'FIFA',
      genre: 'Sports',
      releaseYear: 2010
    };
    myPort = 'http://localhost:4000';
    const response = await request(myPort)
      .post('/games')
      .send(myGame);
    expect(response.status).toBe(201);
    done();
  });
});
