const mongoose = require('mongoose');
const request = require('supertest');
const server = require('./server');
const Game = require('./games/Game');

describe('Games', () => {

  const newGame = { title: 'messing with mongoose', genre: 'sci-fi', releaseDate: '3141' }

  beforeAll(() => mongoose.connect('mongodb://localhost/test').then(() => console.log('\n=== connected to TEST DB ===')))

  afterAll(() => mongoose.disconnect().then(() => console.log('\n=== disconnected from TEST DB ===')))

  afterEach(() => Game.remove())

  it('runs the tests', () => {});

  it('should create a new game', async () => {
    request(server)
      .post('/api/games')
      .send(newGame)
      .expect('Content-Type', /json/)
      .expect(201)
  })

  it('should throw an error when a new game POST does not meet all requirements', () => {
    const noTitle = { genre: 'sci-fi', releaseDate: '3141' }
    const noGenre = { title: 'messing with mongoose', releaseDate: '3141' }
    request(server)
      .post('/api/games')
      .send(noTitle)
      .expect('Content-Type', /json/)
      .expect(500)
    request(server)
      .post('/api/games')
      .send(noGenre)
      .expect('Content-Type', /json/)
      .expect(500)
  })

  // test the GET here

  // Test the DELETE here
});
