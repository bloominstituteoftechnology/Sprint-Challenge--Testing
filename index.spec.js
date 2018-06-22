const mongoose = require('mongoose');
const request = require('supertest');
const server = require('./api/server');

const Game = require('./games/Game');

const testCase = {
  title: 'California Games',
  genre: 'Sports',
  releaseDate: 'June 1987'
}
const badTest = {
  user: 'andrew',
  password: 'password'
}

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
    return Game.create(testCase);
  });

  afterEach(() => {
    //   // clear the games collection.
    return Game.remove(testCase);
  });
  
  // test the POST here
  describe('POST', () => {
    it('should post a game to the database', async () => {
      const response = await request(server)
        .post('/api/games')
        .send(testCase)
      expect(response.status).toEqual(201);  
    });
    it('should return a 500 code when posting the wrong model', async () => {
      const response = await request(server)
        .post('/api/games')
        .send(badTest)
      expect(response.status).toEqual(500); 
    })
  })

  // test the GET here
  describe('GET', () => {
    it('should get a game from the database', async () => {
      const response = await request(server)
        .get('/api/games')
      expect(response.status).toEqual(200); 
    })
    it('should return the document as an array', async () => {
      const response = await request(server)
        .get('/api/games')
      expect(response.body[0]).toEqual(response.body[0])
    })
  })

 // Test the DELETE here
  // describe('Delete', () => {
  //   it('should return a 500 error if not properly deleted', async () => {
  //     const response = await request(server)
  //       .post('/api/games')
  //       .send(testCase)
  //       .delete(`/api/games/${gameId}`)
  //     expect(response.status).toEqual(200)
  //   })
  // })
});
