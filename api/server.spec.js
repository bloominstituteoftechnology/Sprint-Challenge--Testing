const mongoose = require('mongoose');
const request = require('supertest'); 
const server = require('./server');

const Game = require('../games/Game');

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

  let gameId, testGame;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(async () => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks

    testGame =  { 
      title: 'California Games', 
      genre: 'Sports', 
      releaseDate: 'June 1987'
    };
    const saveGame = await Game.create(testGame);
    gameId = testGame._id;
  });

  afterEach(() => {
    //   // clear the games collection.
    return Game.remove();
  });

  it('runs the tests', () => {});

  // ======= test the POST here ========//

  it('should return status 201 if post new game successfully', async () => {
    const newGame = await request(server).post('/api/games').send(testGame);
    const expectedStatusCode = 201;

    expect(newGame.status).toEqual(expectedStatusCode);
  })

  it('should check if the post is object', async () => {
    const newGame = await request(server).post('/api/games').send(testGame);

    expect(typeof newGame).toBe('object');
    expect(newGame.body).toMatchObject({ title: 'California Games', genre: 'Sports', releaseDate: 'June 1987' });
  })

  it('should return title, genre, release date and id', async () => {
    const newGame = await request(server).post('/api/games').send(testGame);

    expect(newGame.body.title).toEqual('California Games');  //req.body
    expect(newGame.body.genre).toEqual('Sports');
    expect(newGame.body.releaseDate).toEqual('June 1987');
    expect(newGame.body).toHaveProperty('_id');
  })

  // ======= test the GET here ==========//

  it('should return status 200 if get the list of games successfully', async () => {
    const game = await request(server).get('/api/games');
    const expectedStatusCode = 200;

    expect(game.status).toEqual(expectedStatusCode);
  })

  //REMINDER That this data structure returned from Mongo will be an array, so to test your game with a beforeEach hook you'll need to make sure you test against the first item in the array. expect(res.data[0].foo).to.equal(bar.foo);
  it('should return title, genre and release date', async () => {
    const game = await request(server).get('/api/games');

    expect(game.body[0].title).toEqual('California Games');  
    expect(game.body[0].genre).toEqual('Sports');
    expect(game.body[0].releaseDate).toEqual('June 1987');
  })

  // ========== Test the DELETE here ============//

  //204 below got error 500...ARRRRGGGGGGG

  it('should return status 204 if delete games successfully', async () => {
    const addGame = await Game.create({
      title: 'Super Mario', 
      genre: 'Family', 
      releaseDate: 'September 1985'
    })
    const deleteGame = await request(server).delete(`/api/games/${addGame._id}`);

    expect(deleteGame.status).toEqual(204);
  })

  it('should return status 404 if delete non-existing game', async () => {
    const deleteGame = await request(server).delete('/api/games/');

    expect(deleteGame.status).toEqual(404);
  })
});
