const mongoose = require('mongoose');
const server = require('./server');
const Game = require('../games/Game');
const request = require('supertest')

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
    return Game.create({
        title: 'California Games',
        genre: 'Sports',
        releaseDate: 'June 1987'
      })
      .then(game => {
        gameId = game._id
        // console.log(gameId)
      })
  });

  afterEach(() => {
    //   // clear the games collection.
    return Game.remove({})
  });

  it('runs the tests', () => {});

  // test the POST here
  it("should post data to database", async () => {
    await request(server)
      .post('/api/games')
      .send({
        title: 'New York Games',
        genre: 'Sports',
        releaseDate: 'June 1982'
      })
      .expect(201)
      .then(response => {
        // console.log(response)
        expect(response.body).toHaveProperty('title', 'New York Games')
        expect(response.body).toHaveProperty('genre', 'Sports')
        expect(response.body).toHaveProperty('releaseDate', 'June 1982')
      })
  })

  it("should not post data to database when title is missing", async () => {
    await request(server)
      .post('/api/games')
      .send({
        title: '',
        genre: 'Sports',
        releaseDate: 'June 1982'
      })
      .expect(500)
      .then(response => {
        // console.log(response)
        expect(response.body).toHaveProperty('message', 'Error saving data to the DB')
      })
  })

  it("should not post data to database when genre is missing", async () => {
    await request(server)
      .post('/api/games')
      .send({
        title: 'New York Games',
        genre: '',
        releaseDate: 'June 1982'
      })
      .expect(500)
      .then(response => {
        // console.log(response)
        expect(response.body).toHaveProperty('message', 'Error saving data to the DB')
      })
  })

  it("should post data to database when releaseDate is missing", async () => {
    await request(server)
      .post('/api/games')
      .send({
        title: 'New York Games',
        genre: 'Sports',
        releaseDate: ''
      })
      .expect(201)
      .then(response => {
        // console.log(response)
        expect(response.body).toHaveProperty('title', 'New York Games')
        expect(response.body).toHaveProperty('genre', 'Sports')
        expect(response.body).toHaveProperty('releaseDate', '')
      })
  })

  // test the GET here
  it("should get data from database", async () => {
    await request(server)
      .get('/api/games')
      .expect(200)
      .then(response => {
        // console.log(response.body)
        expect(response.body).toHaveLength(1)
        expect(response.body[0]).toHaveProperty('title', 'California Games')
        expect(response.body[0]).toHaveProperty('genre', 'Sports')
        expect(response.body[0]).toHaveProperty('releaseDate', 'June 1987')
      })
  })

  // Test the DELETE here
  it("should delete data from database", async () => {
    await request(server)
      .delete(`/api/games/${gameId}`)
      .expect(204)
  })

  it("should not delete data from database when id does not exist", async () => {
    await request(server)
      .delete(`/api/games/5b4a42b33a77c916c444ae9d`)
      .expect(404)
      .then(response => {
        expect(response.body).toHaveProperty('message', 'Game not found')
      })
  })

  it("should not delete data from database when id is not provided", async () => {
    await request(server)
      .delete(`/api/games/`)
      .expect(404)
  })

  it("should not delete data from database when id is invalid", async () => {
    await request(server)
      .delete(`/api/games/1`)
      .expect(500)
  })
});
