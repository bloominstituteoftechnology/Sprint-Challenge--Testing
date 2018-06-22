const mongoose = require('mongoose');
const request = require('supertest');
const server = require('./server');
const Game = require('./games/Game');

describe('Games', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='));
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
    const newGame = new Game({    //Creates a new game in the database 
      title: 'Resident Evil II',
      genre: 'Survivol Horror',
      releaseDate: 'January 1998'
    })
    newGame.save((err, savedGame) => {
      if (err) {
      } else {
        gameId = savedGame._id
      }
    })
  });

  afterEach(() => {
    return Game.remove()
  });

  it('runs the tests', () => {});

  // test the POST here

  // test the GET 
  
  it('should get a game from db', async () => {
    const response = await request(server)
    .get('/api/games')
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    expect(response.body[0].title).toEqual('Resident Evil II');
  })

  // Test the DELETE here
});
