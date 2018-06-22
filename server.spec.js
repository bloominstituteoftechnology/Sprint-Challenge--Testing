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

  beforeEach(async () => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    const dummyData = [
      {
        _id: "5b2d1983633f412f4d1d9368",
        title: 'Mario Bros.',
        genre: 'Platforming',
        releaseDate: 'June 1983'
      },
      {
        title: 'Tetris',
        genre: 'Puzzle',
        releaseDate: 'June 1984'
      }
    ];
    await Game.create(dummyData);
  });

  afterEach(async () => {
    //   // clear collection.
    await Game.remove({});
  });

  it('runs the tests', () => {});

  // test the POST here
  describe('POST Requests:', () => {

    const newGame = {
      title: 'Final Fantasy',
      genre: 'Role-playing',
      releaseDate: 'December 1987'
    };

    it('INTEGRATION: rejects request if request body is not complete.', async () => {
      const noTitle = {
        genre: newGame.genre,
        releaseDate: newGame.releaseDate
      };
      const noGenre = {
        title: newGame.title,
        releaseDate: newGame.releaseDate
      };
      const expectedErrorStatusCode = 500;

      const noTitleResponse = await request(server).post('/api/games').send(noTitle);
      expect(noTitleResponse.status).toBe(expectedErrorStatusCode);

      const noGenreResponse = await request(server).post('/api/games').send(noGenre);
      expect(noGenreResponse.status).toBe(expectedErrorStatusCode);
      
    })

    it('INTEGRATION: accepts request if request given complete.', async () => {
      const expectedStatusCode = 201;
      
      const { status, body } = await request(server).post('/api/games').send(newGame);
      expect(status).toBe(expectedStatusCode);
      expect(body).toEqual(expect.objectContaining(newGame));

    })
  })
  // test the GET here
  
  // test the DELETE here
  describe('DELETE Requests:', () => {
    it('UNIT: rejects request if `id` is not provided.', async () => {
      const expectedStatusCode = 422; 
      const expectedBody = { message: 'You need to give me an ID' };

      const response = await request(server).delete('/api/games');

      expect(response.status).toBe(422);
      expect(response.body).toEqual(expectedBody);
    });
  });
  // test the PUT here
  xdescribe('PUT Requests:', () => {

    it('UNIT: rejects request if title or id is missing.', () => {
      
    });
  });
});
