const mongoose = require('mongoose');

const Game = require('../games/Game');
const request = require('supertest')
const server = require('./server')

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

  beforeEach(async () => {
     await Game.Create(
      {
        title: 'California Games',
        genre: 'Sports',
        releaseDate: 'June 1987'
      }
    )
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
  });

  afterEach(() => {
    return Game.remove();
    //   // clear the games collection.
  });

  it('runs the tests', () => {});

  describe('POST', () => {
    it('should return status code 201',async () => {
      const zelda =  {
        title: 'Zelda',
        genre: 'adventure',
        releaseDate: 'March 2017'
      }
      const response = await request(server)
      .post('/api/games').send(zelda).expect(201)
    })
    it ('should return status 500', async () => {
      const badGame = {
        missingContent: 'adfafas'
      }
      const response = await request(server)
      .post('/api/games').send(badGame).expect(500)
    })
  })

  describe('GET', () => {
    it ('should return status 200', async () => {
      const response = await request(server).get('/api/games').expect(200)
    })
    it ('should return array of games', async () => {
      const response = await request(server).get('/api/games')
      expect(Array.isArray(response.body)).toBe(true)
    })
  })


  describe('DELETE', () => {
    it('Should return status code 204',async () => {
      const game = await request(server).delete(`/api/games/${gameId}`).expect(204)
    })
    it ('should return 404', async () =>{
      await request(server).delete('/api/games/123').expect(500)
    } )
  })

  
  // test the POST here

  // test the GET here

  // Test the DELETE here
});
