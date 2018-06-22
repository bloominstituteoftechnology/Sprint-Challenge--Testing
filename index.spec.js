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

  beforeEach (async () => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    const logGame = await Game.create({
        title: '',
        genre: '',
        releaseDate: ''
      })
    })
  });

  afterEach( async() => {
    //   // clear the games collection.
    await Game.remove()
  });

  // test the POST here
  describe('Index.js', () => {
    it('should retunr a 200 and create a new logged game', () => {
      const newGame = {title: 'NewGame', genre: 'lifestyle', releaseDate: '01/01/2019'};

      const savedGame = Game.create(newGame);

      expect(savedGame.title).toEqual(savedGame.title)
    });
  });
  

  // test the GET here

  // Test the DELETE here

