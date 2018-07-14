const request = require('supertest');
const server = require('./server');
const mongoose = require('mongoose');
const Game = require('../games/Game');

describe('The API Server', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => {})
      .catch(err => {
        console.log('error connecting to TEST database, is MongoDB running?');
      });
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  let gameId;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(async () => {
    await Game.create({
      title: 'Hollow Knight',
      genre: 'Metroidvania',
      releaseDate: 'June 2018',
    });

    await Game.create({
      title: 'Ocotopath Traveler',
      genre: 'JRPG',
      releaseDate: 'July 2018',
    })
  });

  afterEach(async () => {
    await Game.remove();
  });

  it('runs the tests', () => {});

  it('GET endpoint successfully returns 200', async () => {
    await request(server)
      .get('/api/games')
      .expect(200)
  })

  it('GET endpoint should return a list of games', async () => {
    const response = await request(server).get('/api/games')
    const expected = {
      title: 'Hollow Knight',
      genre: 'Metroidvania',
      releaseDate: 'June 2018',
    }
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toMatchObject(expected);
  })

  it('POST endpoint should successfully return 201', async () => {
    const newGame = {
      title: 'Pokemon',
      genre: 'JRPG',
      releaseDate: 'i dont remember lol',
    };
    await request(server)
      .post('/api/games')
      .send(newGame)
      .expect(201);
  })

  it('POST endpoint should return 500 if invalid data is given', async () => {
    const newGame = {
      releaseDate: 'July 2018'
    }
    await request(server)
      .post('/api/games')
      .send(newGame)
      .expect(500)
  })

  // test the GET here

  // Test the DELETE here
});
