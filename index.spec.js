const mongoose = require('mongoose');
const request = require('supertest'); //needed to run tests on CRUD endpoints
const server = require('./api/server.js');

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
  let testGame;
  let deleteGame;
  
  beforeEach(async () => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    testGame = {
      title: 'whatever',
      genre: 'idontplaygames',
    };

    gameId = await Game.create(testGame);
    deleteGame = gameId._id;
  });

  afterEach(() => {
    //   // clear the games collection.
    return Game.remove(); //totally stolen from my User.spec from yesterday, which was totally stolen from Luis.
  });

  it('runs the tests', () => {});

  // test the POST here

  it('should post new games', async() => {
    const newGame = { title: 'newgame', genre: 'puzzle' };
    const response = await request(server).post('/api/games').send(newGame);

    expect(response.status).toEqual(201);

    
  });

  // test the GET here

  it('should return a status of 200 from the /api/games route', async() => {
    const response = await request(server).get('/api/games');
    expect(response.status).toEqual(200);
  });

  it('should have a title and genre for each game in the list', async() => {
    const response = await request(server).get('/api/games');
    expect(response.body[0]).toHaveProperty('title');
    expect(response.body[0]).toHaveProperty('genre');
  });

  // Test the DELETE here
});
