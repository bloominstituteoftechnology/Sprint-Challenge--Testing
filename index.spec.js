const mongoose = require('mongoose');
const request = require('supertest');
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

  const logGame = {
    title: 'NBA 2k19',
    genre: 'Sports',
    releaseDate: 'September 11, 2018'
  }

  let gameId;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach (async () => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
     await Game.create(logGame)
  });

  afterEach( async() => {
    //   // clear the games collection.
     await Game.remove()
  });

  // test the POST here
 
    it('should return a 201 and create a new logged game', async () => {
      const newGame = {title: 'NewGame', genre: 'lifestyle', releaseDate: '01/01/2019'};
      const expectedStatusCode = 201;

      const response = await request(server).post('/api/games').send(newGame);
      
      expect(response.body.title).toEqual('NewGame');
      expect(response.status).toEqual(expectedStatusCode);
      expect(response.type).toEqual('application/json');
    });
  });

  // test the GET here
    it('should get the games and return 200', async () => {
      const response = await request(server).get('/api/games');

      expect(response.status).toBe(200);
      expect(response.type).toEqual('application/json')
    });

  
    // Test the DELETE here
    it('should delete a game and send 204', async () => {
      const newGame = {title: 'NewGame', genre: 'lifestyle', releaseDate: '01/01/2019'};
      const expectedStatusCode = 204;

      const makeGame = await Game.create(newGame)
      const response = await request(server).delete(`/api/games/${makeGame._id}`);
      
      expect(response.status).toEqual(expectedStatusCode);
      expect(response.type).toEqual('application/json')
  });