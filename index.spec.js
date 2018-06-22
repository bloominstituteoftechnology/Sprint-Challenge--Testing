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
  it('it should return title and genre for each game in the db', async() => {
    const response = await request(server).get('/api/games');
    expect(response.body[0]).toHaveProperty('title');
    expect(response.body[0]).toHaveProperty('genre');
  });
  it('should return the status code 200', async() => {
    const response = await request(server).get('/api/games');
    expect(response.status).toEqual(200);
  })
  // Test the DELETE here
  it('should return the status code 204 after deleting a game from db', async() => {
    const response =  await request(server).delete(`/api/games/${gameId._id}`);
    console.log(gameId._id);
    expect(response.status).toEqual(204);
  });
  if('should return the status code 404 if game is not in db', async() => {
    const response = await request(server).delete('/api/games/5b2d3930850b0b0355b8ezzz');
    expect(response.status).toEqual(404);
    expect(response.status.message).toEqual('Game not found');
  });

});
