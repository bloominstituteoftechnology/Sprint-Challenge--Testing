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

  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
  const game = {
    title: 'California Games',
    genre: 'Sports',
    releaseDate: 'June 1987'
  };
  return Game.create(game);
  });

  afterEach(() => {
    //   // clear the games collection.
    return Game.remove();
  });

  it('runs the tests', () => {});

  // test the POST here
it('returns new game and status code', async() => {
  const expectedStatusCode=201;
  const expectedNewGame={
    title: 'Contra',
    genre: 'Shoot em up',
    releaseDate: 'February 1987'
  };
  
  const newGame = await request(server).post('/api/games').send(expectedNewGame);
expect(newGame.title).toEqual(newGame.title);
expect(newGame.genre).toEqual(newGame.genre);
expect(newGame.releaseDate).toEqual(newGame.releaseDate);
})

it('should provide error code if game is not saved', async() => {
const expectedStatusCode = 500;
const expectedError = 'game could not save';
const expectedNewGame={
  title: 'Contra',
  genre: 'Shoot em up',
  releaseDate: 'February 1987'
};

const newGame = await request(server).post('/api/games').send(expectedNewGame)

expect(newGame.title).toEqual(newGame.title);
expect(newGame.genre).toEqual(newGame.genre);
expect(newGame.releaseDate).toEqual(newGame.releaseDate);
expect(newGame.status).toBe(expectedStatusCode);
expect(newGame.expectedError).toEqual(expectedError);
})
  // test the GET here

  // Test the DELETE here
});
