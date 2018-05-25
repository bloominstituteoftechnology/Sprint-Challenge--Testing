const mongoose = require('mongoose');
const server = require('./server');
const request = require('supertest');
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
  let newGame = { title: 'messing with mongoose', genre: 'sci-fi', releaseDate: '3141' };

  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
  });

  afterEach(() => {
    //   // clear collection.
    return Game.remove()
  });

  it('runs the tests', () => {});

  // test the POST here
  describe('POST', () => {
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
  
    it('should allow a user to POST a game without a release date', () => {
      const noRelease = { title: 'messing with mongoose', genre: 'sci-fi' }
      request(server)
        .post('/api/games')
        .send(noRelease)
        .expect('Content-Type', /json/)
        .expect(201)
    })
  })

  // test the GET here
  describe('GET', () => {
    it('should fetch all games from database', async () => {
      request(server)
        .get('/api/games')
        .expect(200)
        .expect(res => res.length === 0)
  
      const savedGame = await Game.create(newGame)
      const anotherGame = await Game.create({ title: 'jeffrey', genre: 'flynn' })
  
      request(server)
        .get('/api/games')
        .expect(200)
        .expect(res => res.length === 2)
    })
    
    it('should fetch a game with provided ID', async () => {
      const savedGame = await Game.create(newGame)
      request(server)
        .get(`/api/games/${savedGame._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => res.body.title === newGame.title)
        .expect(res => res.body.genre === newGame.genre)
        .expect(res => res.body.releaseDate === newGame.releaseDate)
    })
  })


  // Test the DELETE here
});
