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
  let zeldaGame

  beforeEach(async() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    const zeldaGame = await Game.create({
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
    it('should to be able to check a game that has a title', async () => {
      const Zelda = { title: 'The Legend of Zelda', genre: 'adventure'};

      const response = await request(server)
        .post('/api/games')
        .send(Zelda);

        expect(response.body.title).toEqual('The Legend of Zelda');
    });

    it('should to be able to check a game that has a genre', async () => {
      const Zelda = { title: 'The Legend of Zelda', genre: 'adventure'};

      const response = await request(server)
        .post('/api/games')
        .send(Zelda);

        expect(response.body.genre).toEqual('adventure');
    });
  });

  // test the GET here
  it('should be able to return status code 200 to get list of games', async () => {
    const response = await request(server)
      .get('/api/games')

    const { genre, releaseDate, title } = response.body[0];

    expect(response.status).toEqual(200);
  });

  it('should return title and genre for each of the games', async() => {
    const response = await request(server).get('/api/games');
    expect(response.body[0]).toHaveProperty('title');
    expect(response.body[0]).toHaveProperty('genre');
  });

  // Test the DELETE here
  it('return status code 404 if game does not exist', async () => {
    const response = await request(server)
      .get('/api/games')
    const deleteId = response.body[0]._id;  
    const responseDelete = await request(server)
      .delete('/api/games${responseDelete}');

      expect(responseDelete.status).toEqual(404);
  });

  it('error should return status code 500', async () => {
    const expectedCode = 500;
    const gameDeleted = await request(server).delete(`/api/games/0`);

    expect(gameDeleted.status).toEqual(expectedCode);
  });

});
