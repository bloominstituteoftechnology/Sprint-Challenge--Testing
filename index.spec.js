const mongoose = require('mongoose')

const Game = require('./games/Game')

const server = require('./api/server')

const request = require('supertest')

describe('The API Server', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='))
      .catch(err => {
        console.log('error connecting to TEST database, is MongoDB running?')
      })
  })

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='))
  })

  let gameId
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    // return gameId.clear().then(() => {
    // return gameId.insert({ testData: 'foo' })
    // })
    // removeAll(done)
  })

  afterEach(() => {
    //   // clear the games collection.
    return Game.remove()
  })

  it('should return 200 and json from the server route', async () => {
    const expectedStatusCode = 200
    const response = await request(server).get('/api/games')
    expect(response.status).toEqual(expectedStatusCode)
    expect(response.type).toEqual('application/json')
  })

  // test the POST here
  it('should return 201', async () => {
    const expectedStatusCode = 201
    // const expectedTitle = { title: 'California Games' }
    const game = {
      title: 'California Games',
      genre: 'Sports',
      releaseDate: 'June 1987'
    }
    const response = await request(server).post('/api/games').send(game)
    expect(response.status).toEqual(expectedStatusCode)
    expect(response.body.title).toEqual('California Games')
    expect(response.body.genre).toEqual('Sports')
  })
  it('deletes an existing game', async () => {
    const expectedStatusCode = 200
    let ObjectId = mongoose.Schema.Types.ObjectId
    // const response = await request(server).del(`/api/games/:id`).send(ObjectId)
    request(server).delete(`/api/games/:${ObjectId}`)
    expect(expectedStatusCode)
  })
})
