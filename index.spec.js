const mongoose = require('mongoose')
const server = require('./api/server')
const request = require('supertest')

const Game = require('./games/Game')

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
  // hint - these wont be constants because you'll need to override them.

  beforeEach(async () => {
    await Game.create({
      title: 'God of War',
      genre: 'action RPG',
      releaseDate: '2018'
    })
  })

  afterEach(async () => {
    // clear the games collection.
    await Game.remove()
  })

  it('runs the tests', () => {})

  // test the POST here
  it('POST api/games', async () => {
    const godOfWar = {
      title: 'God of War',
      genre: 'action RPG',
      releaseDate: '2018'
    }
    const response = await request(server).post('/api/games').send(godOfWar)

    const {
      status,
      body
    } = response
    const {
      title
    } = body
    const _gameId = '_id' in body

    expect(status).toEqual(201)
    expect(title).toEqual(godOfWar.title)
    expect(_gameId).toBeTruthy()
  })
  // test the GET here
  it('should return all games', async () => {
    const response = await request(server).get('/api/games')

    const {
      status,
      type,
      body
    } = response
    const _gameId = '_id' in body[0]

    expect(status).toEqual(200)
    expect(type).toEqual('application/json')
    expect(_gameId).toBeTruthy()
  })
  // Test the DELETE here
})