const mongoose = require('mongoose');
const request = require('supertest');
const Game = require('./games/Game');
const server = require('./server')

const testGame = {
  title: 'California Games',
  genre: 'Sports',
  releaseDate: 'June 1987'
}

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

  // // hint - these wont be constants because you'll need to override them.

  beforeEach(async () => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    const saveGame = await Game.create({
      title: 'California Games',
      genre: 'Sports',
      releaseDate: 'June 1987'
    })
  });


  afterEach(async () => {
    //   // clear collection.
    await Game.remove()
  });

  it('runs the tests', () => { });
  // test the POST here
  it('Returns status 201 after being posted a user object', async () => {

    const newGame = await request(server).post('/api/games').send(testGame)

    expect(newGame.status).toBe(201)
  })

  it('returns a JSON object along with status code', async () => {

    const newGame = await request(server).post('/api/games').send(testGame)

    expect(newGame.body).toHaveProperty('title', 'California Games')
  })

  it('returns a status code 500 if required data is missing', async () => {

    const newGame = await request(server).post('/api/games').send({ genre: 'Sports', releaseDate: 'June 1987' })

    expect(newGame.status).toBe(500)
  })
  // test the GET here

  it('returns the status code 200', async () => {
    const games = await request(server).get('/api/games')

    expect(games.status).toBe(200)
  })

  it('returns an array of objects, with the first object being our globally set test game', async () => {

    const games = await request(server).get('/api/games')

    expect(games.body[0]).toMatchObject(testGame)
  })

  // Test the DELETE here

  it('returns a status 204 after succesful deletion', async () => {
    const saveGame = await Game.create({
      title: 'newest Games',
      genre: 'Shooter',
      releaseDate: 'June 1987'
    })
    const deletion = await request(server).delete(`/api/games/${saveGame._id}`)

    expect(deletion.status).toBe(204)
  })

  it('returns a status 404 when using an ID not related to any resource', async () => {
    const deletion = await request(server).delete(`/api/games/5b2c49a276949f4351110b42`)

    expect(deletion.status).toBe(404)
  })


});
