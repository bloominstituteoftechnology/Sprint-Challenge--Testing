const request = require('supertest');
const mongoose = require('mongoose');
const server = require('./api/server');
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
    gameId = game._id;
    return Game.create(game);
  
  });

  afterEach(() => {
    return Game.remove();
  });

  it('runs the tests', () => {});


 // test the GET here
  it('returns a new JSON game object and a status code of 201', async () => {
    const expectedStatusCode = 201;
    const expectedGame = {
      title: 'Snowboarding',
      genre: 'Sports',
      releaseDate: 'May 2002'
    };
    const newGame = await request(server).post('/api/games').send(expectedGame);

    expect(newGame.status).toBe(expectedStatusCode);
    expect(newGame.body.title).toBe('Snowboarding');
    expect(newGame.body.genre).toBe('Sports');
    expect(newGame.body.releaseDate).toBe('May 2002');
  })

  it('returns an error code and error message if given incomplete info', async () => {
    const expectedStatusCode = 500;
    const expectedGame = {
      releaseDate: 'May 2002'
    };
    const expectedError = 'Error saving data to the DB';
    const newGame = await request(server).post('/api/games').send(expectedGame);

    expect(newGame.status).toBe(expectedStatusCode);
    expect(newGame.text).toContain(expectedError);
  });


  // test the GET here
  it('returns the OK status code when Games API is fetched', async() => {
    const expectedStatusCode = 200;
    const Games = await request(server).get('/api/games');

    expect(Games.status).toEqual(expectedStatusCode);
  });
  it('returns a title and genre in each game', async() => {
    const Games = await request(server).get('/api/games');

    expect(Games.body[0]).toHaveProperty('title');
    expect(Games.body[0]).toHaveProperty('genre');
  })

  // Test the DELETE here
  it('returns the OK status code when a game object is deleted', async() => {
    const deletedGame = await request(server).delete(`/api/games/${gameId}`);

    expect(deletedGame.status).toEqual(204);
 
  });

});
