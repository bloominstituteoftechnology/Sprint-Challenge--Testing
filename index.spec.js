const mongoose = require('mongoose');
const request = require('supertest');
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
  let sampleGame;
  let deleteGame;
  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    sampleGame = {
      title: 'Madden19',
      genre: '#SPORTS',
      releaseDate: '2019'
    };
    gameId = Game.create(sampleGame);
  });

  afterEach(() => {
    //   // clear the games collection.
    return Game.remove();
  });

  it('runs the tests', () => {});

  // test the POST here
  it('it should post games', async() => {
    const response = await request(server).post('/api/games').send(sampleGame);

    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('genre');

  });
  it('should throw an error if both title and genre are not provided', async() => {
    const sampleGame2 = {title: 'Madden20', releaseDate: '2020'};
    const response = await request(server).post('/api/games').send(sampleGame2);

    expect(response.status).toEqual(500);
    expect(response.body.message).toEqual("Error saving data to the DB");
  });
  // test the GET here

  // Test the DELETE here
});
