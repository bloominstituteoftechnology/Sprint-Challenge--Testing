const request = require('supertest');
const express = require('express');
const db = require('../data/dbConfig');
const gamesModel = require('./gamesModel');
const server = require('../api/server');

const app = express();

afterEach(async () => {
  await db('gameTable').truncate();
});

describe('Game post model', () => {
  it('Should insert provided game', async () => {
    const myGame = await gamesModel.insert({
      title: 'FIFA',
      genre: 'Sports',
      releaseYear: 2010
    });
    const games = await gamesModel.getAll();
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

  it('Check status code is 422 if info is incomplete', async done => {
    const myGame = {
      title: 'FIFA',
      genre: 'Sports'
    };
    myPort = 'http://localhost:4000';
    const response = await request(myPort)
      .post('/games')
      .send(myGame);
    expect(response.status).toBe(422);
    done();
  });

  it('Check type of data is ', async done => {
    const myGame = {
      title: 'FIFA',
      genre: 10,
      releaseYear: 2010
    };
    myPort = 'http://localhost:4000';
    const response = await request(myPort)
      .post('/games')
      .send(myGame);
    expect(response.status).toBe(400);
    done();
  });
});

describe('Check get calls', () => {
  it('Check response status code', async done => {
    myPort = 'http://localhost:4000';
    const response = await request(myPort).get('/games');
    expect(response.status).toBe(200);
    done();
  });

  it('Check that we are receiving JSON data', async done => {
    myPort = 'http://localhost:4000';
    const response = await request(myPort)
      .get('/games')
      .expect('Content-Type', /json/);
    done();
  });

  it('Check the type of data we are receiving', async done => {
    myPort = 'http://localhost:4000';
    const response = await request(myPort).get('/games');
    console.log('RES', response.body);
    expect(typeof response.body).toBe('object');
    done();
  });
});
