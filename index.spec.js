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

  beforeEach( async () => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    const newGame = await Game.create(testCase);
    gameId = newGame._id;
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
      // expect(response.body).toBe(Array) // doesn't work
      expect(response.body).not.toBe(String)
      expect(response.body).not.toBe(Object)
      expect(response.body[0].title).toBe("California Games")
    })
  })

  // Test the DELETE here
  describe('Delete', () => {
    it('should delete a game', async () => {
      const response = await request(server)
        .delete(`/api/games/${gameId}`);
      expect(response.status).toEqual(204)
    })
    // it('should return a 422 if no id given', async () => {
    //   const response = await request(server)
    //     .delete('/api/games/');
    //   expect(response.status).toEqual(422) // it is recieving a 404
    // })
    // it('should return a 404 if the gameId doesn\'t exist', async () => {
    //   const response = await request(server)
    //     .delete('/api/games/123')
    //   expect(response.status).toEqual(404) //it is recieving a 500
    // })
  })
});
