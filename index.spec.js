const mongoose = require('mongoose');

const Game = require('./games/Game');

const server = require('./api/server'); // this is our first red, it doesn't exist
const request = require('supertest'); // second red flag

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

    const game = Game ({
      title: 'California Games',
      genre: 'Sports',
      releaseDate: 'June 1987'
    });
    gameId = String(game._id);
    return Game.create(game);

  });

  afterEach(() => {
    //   // clear the games collection.
    return Game.remove();
  });

  // test the POST here

  it('POST tests: should return an OK status(201) code and a JSON object fron /api/games', async () => {
    const game = {title: 'California Games', genre: 'Sports', releaseDate: 'June 1987'};
    const expectedStatusCode = 201;

    // post a game
    let savedGame = await request(server).post('/api/games').send(game);
    let { title, genre, releaseDate } = savedGame.body;
    let body = { title, genre, releaseDate };

    expect(savedGame.status).toEqual(expectedStatusCode);
    expect(body).toEqual(game);

  });

  // test the GET here

  it('GET tests: Get all games and should return an OK status(200) fron /api/games', async () => {
    const expectedStatusCode = 200;
    
    // get all todos
    let allGames = await request(server).get('/api/games');
    let { _id } = allGames.body[0];

    expect(allGames.status).toEqual(expectedStatusCode);
    expect(_id).toEqual(gameId);

  });

  // Test the DELETE here

  it('DELETE tests: Delete a game and should return an OK status(204) fron /api/games/:id', async () => {
    const expectedStatusCode = 204;
    
    const deletedGame = await request(server).delete(`/api/games/${gameId}`);

    expect(deletedGame.status).toEqual(expectedStatusCode);

  });

  it('DELETE tests with a not existing key: should return an OK status(500) fron /api/games/:id', async () => {
    const expectedStatusCode = 404;
    
    const deletedGame = await request(server).delete(`/api/games/5b2d74af1f00ff5250020b1d`);

    expect(deletedGame.status).toEqual(expectedStatusCode);

  });

  it('DELETE tests error with invalid key: should return an OK status(500) fron /api/games/:id', async () => {
    const expectedStatusCode = 500;
    
    const deletedGame = await request(server).delete(`/api/games/123`);

    expect(deletedGame.status).toEqual(expectedStatusCode);

  });
});