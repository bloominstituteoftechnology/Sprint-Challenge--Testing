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

    it('should return an error if an invalid ID is provided', async () => {
      request(server)
        .get('/api/games/123')
        .expect(404)
        .expect('Content-Type', /json/)
        .expect(res => res.message === 'Game not found')
    })
  });


  // Test the DELETE here
  describe('DELETE', () => {
    it('should delete an existing game if a proper ID is provided', async () => {
      const savedGame = await Game.create(newGame)
      request(server)
        .delete(`/api/games/${savedGame._id}`)
        .expect(204) // game exists and has been removed test
    });

    it('should return an error if no ID is provided for DELETE', async () => {
      request(server)
        .delete('/api/games')
        .expect('Content-Type', /json/)
        .expect(res => res.message === 'You need to give me an ID')
        .expect(422)
    });

    it('should return an error if an invalid ID is provided for DELETE', async () => {
      request(server)
        .delete('/api/game/123')
        .expect('Content-Type', /json/)
        .expect(res => res.message === 'Game not found')
        .expect(404)
    });
  })

  // PUT
  describe('PUT', () => {
    it('should be able to update an existing user', async () => {
      const savedGame = await Game.create(newGame)
      const updates = { title: 'jeffrey', genre: 'flynn' }
      request(server)
        .put(`/api/games/${savedGame._id}`)
        .send(updates)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => res.body.title === 'jeffrey')
        .expect(res => res.body.genre === 'flynn')
    });

    it('should return an error for a PUT request with no title', async () => {
      const savedGame = await Game.create(newGame)
      const updates = { genre: 'jeffrey' }
      request(server)
        .put(`/api/games/${savedGame._id}`)
        .send(updates)
        .expect(422)
        .expect('Content-Type', /json/)
        .expect(res => res.message === 'Must Provide a title && Id')
    });

    it('should return an error for a PUT request with an invalid ID', async () => {
      request(server)
        .put('/api/games/123')
        .expect(404)
        .expect('Content-Type', /json/)
        .expect(res => res.message === 'Game not found')
    });
  })

});
