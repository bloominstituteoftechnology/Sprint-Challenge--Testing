const mongoose = require('mongoose');
const server = require('./api/server');
const request = require('supertest');
const Game = require('./games/Game');

describe('The API Server', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='))
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
  let newGame;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    newGame = { title: 'Target Hit', genre: 'sports', releaseDate: 'June 2018' };
        const savedGame =  Game.create(newGame);
        gameId = savedGame._id;       
  });

  afterEach(() => {
    //   // clear the games collection.
    return Game.remove();
  });

  it('runs the tests', () => {});

  // test the POST here
  describe('POST', () => {
    it('should create a new game', async () => {
      await 
      request(server)
        .post('/api/games')
        .send(newGame)
        .then(res => {
          expect(res.status).toBe(201)
          expect(res.type).toBe('application/json')
          expect(res.body.title).toBe('Target Hit')
          expect(res.body.genre).toBe('sports')
          expect(res.body.releaseDate).toBe('June 2018')
        })
    })
  
    it('should throw an error when a new game POST does not meet all requirements', async () => {
      const noTitle = { genre: 'sports', releaseDate: 'June 2018' }
      const noGenre = { title: 'Target Hit', releaseDate: 'June 2018' }
      await request(server).post('/api/games').send(noTitle).then(res => expect(res.status).toBe(500))
      await request(server).post('/api/games').send(noGenre).then(res => expect(res.status).toBe(500))
    })
  
    it('should allow a user to POST a game without a release date', async () => {
      const noRelease = { title: 'Target Hit', genre: 'sports' }
      await request(server).post('/api/games').send(noRelease).then(res => expect(res.status).toBe(201))
    })
  })

  // test the GET here

  describe('GET', () => {
    it('should fetch all games from database', async () => {
      const savedGame = await Game.create(newGame)
      const anotherGame = await Game.create({ title: 'Bubble Pop', genre: 'Silly' })
      await 
      request(server)
        .get('/api/games')
        .then(res => {
          expect(res.status).toBe(200)
          expect(res.type).toBe('application/json')
          expect(res.body).toHaveLength(3)
        })
    })

    it('should fetch a game with provided ID', async () => {
      const savedGame = await Game.create(newGame)
      await 
      request(server)
        .get(`/api/games/${savedGame._id}`)
        .then(res => {
          expect(res.status).toBe(200)
          expect(res.body.title).toEqual(newGame.title)
          expect(res.body.genre).toEqual(newGame.genre)
          expect(res.body.releaseDate).toEqual(newGame.releaseDate)
        })
    })

    it('should return an error if an invalid ID is provided', async () => {
      await 
      request(server)
        .get('/api/games/123')
        .then(res => {
          expect(res.status).toBe(500)
          expect(res.body.message).toBe('Something really bad happened')
          expect(res.type).toBe('application/json')
        })
    })
  })


  // Test the DELETE here

  describe('DELETE', () => {
    it('should delete an existing game if a proper ID is provided', async () => {
      const savedGame = await Game.create(newGame)
      await request(server).delete(`/api/games/${savedGame._id}`).then(res => expect(res.status).toBe(204))
    })
  
    it('should return an error if no ID is provided for DELETE', async () => {
      await request(server).delete('/api/games').then(res => expect(res.status).toBe(404))
    })
  
    it('should return an error if an invalid ID is provided for DELETE', async () => {
      await request(server).delete('/api/game/123').then(res => expect(res.status).toBe(404))
    })
  })
  
  
  describe('PUT', () => {
    it('should be able to update an existing user', async () => {
      const savedGame = await Game.create(newGame)
      const updates = { title: 'Bubble Pop', genre: 'Silly' }
      await 
      request(server)
      .put(`/api/games/${savedGame._id}`)
      .send(updates)
      .then(res => {
        expect(res.status).toBe(200)
        expect(res.type).toBe('application/json')
        expect(res.body.title).toBe('Bubble Pop')
        expect(res.body.genre).toBe('Silly')
      })
    })
    
    it('should return an error for a PUT request with no title', async () => {
      const savedGame = await Game.create(newGame)
      const updates = { genre: 'Silly' }
      await 
      request(server)
      .put(`/api/games/${savedGame._id}`)
      .send(updates)
      .then(res => {
        expect(res.status).toBe(422)
        expect(res.type).toBe('application/json')
        expect(res.body.error).toBe('Must Provide a title && Id')
      })
    })
    
    it('should return an error for a PUT request with an invalid ID', async () => {
      await 
      request(server)
      .put('/api/games/123')
      .send({ title: 'Bubble Pop', genre: 'Silly' })
      .then(res => {
        expect(res.status).toBe(500)
        expect(res.type).toBe('application/json')
        expect(res.body.message).toBe('Something really bad happened')
      })
    })
  })  
  
});