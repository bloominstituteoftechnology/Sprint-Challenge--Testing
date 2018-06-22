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
    Game.remove();
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
          expect(res.body).toHaveLength(2)
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
          expect(res.status).toBe(404)
          expect(res.body.message).toBe('Game not found')
          expect(res.type).toBe('application/json')
        })
    })
  })


  // Test the DELETE here
});
