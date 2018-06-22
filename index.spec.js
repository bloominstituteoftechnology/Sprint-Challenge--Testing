const mongoose = require('mongoose');

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
      const saved = await Game.create(songIn);
      const expectedStatusCode = 201
      expect(saved.title).toEqual(songIn.title);
      expect(saved.genre).toEqual(songIn.genre);
      //expect(saved.status).toEqual(expectedStatusCode);
    });
  });


  describe('get', () => {
    it('should be an object', async () => {
      const saved = await Game.find({});
      expect(typeof saved).toEqual("object")
    });

    it('should have some lenght', async () => {
      const saved = await Game.find({});
      expect(saved.length).toBeGreaterThanOrEqual(1)
    });

    it('should have created latest data', async () => {
      const songIn = { title: 'samars song', genre: 'pop' , releaseDate: '12/05/2000'};
      const saved = await Game.create(songIn);
      const getAll = await Game.find({});
      const getLatest = getAll[getAll.length-1]
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
