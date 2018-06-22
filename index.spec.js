const mongoose = require('mongoose');
const request = require('supertest');
const Game = require('./games/Game');
const server = require('./api/server')


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
  // // hint - these wont be constants because you'll need to override them.

  beforeEach( async () => {
    const songIn = { title: 'samars song', genre: 'pop' , releaseDate: '12/05/2000'};
    const saved = await Game.create(songIn);
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
  });

  afterEach(() => {
    //   // clear the games collection.
    Game.remove()
  });

  it('runs the tests', () => {});

  describe('post', () => {
    it('should post', async () => {
      const songIn = { title: 'x', genre: 'pop' , releaseDate: '12/05/2000'};
      const saved = await request(server).post('/api/games').send(songIn)
      const expectedStatusCode = 201
      //console.log(saved.body)
      expect(saved.body.title).toEqual(songIn.title);
      expect(saved.body.genre).toEqual(songIn.genre);
      expect(saved.status).toEqual(expectedStatusCode);
    });
  });


  describe('get', () => {
    it('should be an object', async () => {
      const saved = await request(server).get('/api/games')
      expect(typeof saved).toEqual("object")
    });

    it('should have some lenght', async () => {
      const saved = await request(server).get('/api/games')
      expect(saved.body.length).toBeGreaterThanOrEqual(1)
    });

    it('should have created latest data', async () => {
      const songIn = { title: 'samars song', genre: 'pop' , releaseDate: '12/05/2000'};
      const expectedStatusCode = 200
      const getAll = await request(server).get('/api/games')
      const getLatest = getAll.body[getAll.body.length-1]
      //console.log(getAll.body)
      expect(getAll.status).toEqual(expectedStatusCode);
      console.log(getAll.body[0])
      expect(getLatest).toMatchObject(songIn)
      expect(getLatest.title).toEqual(songIn.title);
      expect(getLatest.genre).toEqual(songIn.genre);
    });
  });


  describe('delete', () => {
    it('should post', async () => {
      const songIn = { title: 'x', genre: 'pop' , releaseDate: '12/05/2000'};
      const saved = await Game.create(songIn);
      const expectedStatusCode = 201
      expect(saved.title).toEqual(songIn.title);
      expect(saved.genre).toEqual(songIn.genre);
      //expect(saved.status).toEqual(expectedStatusCode);
    });
  });
});
