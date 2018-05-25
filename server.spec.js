const mongoose = require('mongoose');
const request = require('supertest')
const faker = require('faker')
const server = require('./server')
const Game = require('./games/Game');

const date = faker.date.past
const { word } = faker.random

describe('Games', () => {
  beforeAll(() => {
    // Make some seed data
    const games = []
    for (let i = 0; i < 5; i++) {
      games.push({
        title: word(),
        genre: word(),
        releaseDate: date()
      })
    }

    // Connect to mongo and squirt some seeds
    return mongoose
      .connect('mongodb://localhost/testsprint')
      .then(() => Game.insertMany(games));
  });

  afterAll(() => {
    // Remove all games and disconnect
    return Game.remove()
      .then(() => mongoose.disconnect())
  });

  it('runs the tests', () => {});

  it('responds to GET `/api/games` with a list of games', async () => {
    const response = await request(server).get('/api/games')

    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toHaveLength(5)
  })

  it('responds to POST `/api/games` with the newly created document', async () => {
    const game = { title: word(), genre: word(), releaseDate: date().toString() }
    const response = await request(server).post('/api/games').send(game)

    expect(response.status).toBe(201)
    expect(response.type).toBe('application/json')
    expect(response.body).toMatchObject(game)
  })

  it('responds to an invalid POST with a 500 error code', async () => {
    const invalid = { releaseDate: date() }
    const response = await request(server).post('/api/games').send(invalid)

    expect(response.status).toBe(500)
  })

  it('responds to PUT `/api/games/:id` with the updated document', async () => {
    const game = { title: word(), genre: word(), releaseDate: date().toString() }
    const document = new Game(game)
    const { _id } = document
    const update = { title: word(), id: _id }
    return document.save()
      .then(async () => {
        const response = await request(server).put(`/api/games/${_id}`).send(update)

        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json')
        expect(response.body).toMatchObject({ title: update.title })
      })
  })

  it('responds to a PUT to a nonexistent resource with a 404 error code', async () => {
    const id = 'gobbledygook'
    const response = await request(server).put(`/api/games/${id}`).send({ title: word(), id: 'gobbledygook' })
      
    expect(response.status).toBe(404)
  })

  it('responds to an invalid PUT with a 422 error code', async () => {
    const response = await request(server).put('/api/games/:id').send({})

    expect(response.status).toBe(422)
  })

  it('responds to DELETE `/api/games/:id` with a 204 status code', async () => {
    const game = { title: word(), genre: word(), releaseDate: date().toString() }
    const document = new Game(game)
    const { _id } = document
    return document.save()
      .then(async () => {
        const response = await request(server).delete(`/api/games/${_id}`)

        expect(response.status).toBe(204)
      })
  })

  it('responds to a DELETE to a nonexistent resource with a 404 error code', async () => {
    const id = 'gobbledygook'
    const response = await request(server).delete(`/api/games/${id}`)

    expect(response.status).toBe(404)
  })
});
