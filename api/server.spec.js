const request = require('supertest');
const mongoose = require('mongoose');

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

  let gameId;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(async() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    const marioGame = await Game.create({
      title: 'The Legend of Zelda',
      genre: 'adventure',
      releaseDate: 'February 1986'
    });
  });

  afterEach(() => {
    //   // clear the games collection.
    return Game.remove
  });

  it('runs the tests', () => {});

  // test the POST here
  describe('POST game', () => {
    it('should to be able to create a game', async () => {
      const Zelda = { title: 'The Legend of Zelda', genre: 'adventure'};

      const response = await request(server)
        .post('/api/games')
        .send(Zelda);

        expect(response.body.title).toEqual('The Legend of Zelda');
    });
  });

  // test the GET here
  it('should be able to return a list of games', async () => {
    const response = await request(server)
      .get('/api/games')

    const { genre, releaseDate, title } = response.body;

    expect(response.status).toEqual(200);
  })

  // Test the DELETE here
  // it('should be able to delete game', asynce () => {
  //   const response = await request(server)
  //     .put(`/api/games/${gameId}`)
  //     .send({
  //       title: 'The Legend of Zelda',
  //       genre: 'adventure',
  //       releaseDate: 'February 1986'
  //     });
      
  // });
});
