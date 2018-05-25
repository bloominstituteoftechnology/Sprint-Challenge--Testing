const mongoose = require('mongoose');
const request = require('supertest')
const server = require('./server')

const Game = require('./games/Game');

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

  let gameId;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(async () => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    const newGame = new Game({
      title: 'eh',
      genre: 'uh',
      'releaseDate': '22'
    })

    let savedGame = await newGame.save()
    gameId = savedGame._id
  });

  afterEach(() => Game.remove());

  it('post', async () => {
    const fakeBody = {
      title: 'not a game',
      genre: 'murder-dating simulator',
      releaseDate: '3'
    }
    const res = await request(server)
      .post('/api/games')
      .send(fakeBody)
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('_id')
    expect(res.body).toHaveProperty('title')
    expect(res.body).toHaveProperty('genre')
  })

  it('get', async () => {
    const res = await request(server).get('/api/games')
    expect(res.status).toBe(200)
  })

  it('delete', async () => {
    const res = await request(server).delete(`/api/games/${gameId}`)
    expect(res.status).not.toBe(404)
    expect(res.status).toBe(204)
  })

  describe('stretch', () => {
    it('put', async () => {
      const updatedGame = {
        id: `${gameId}`,
        title: 'ultimega slothazor 9k',
        genre: 'farm simulator'
      }

      const res = await request(server).put(`/api/games/${gameId}`).send(updatedGame)

      expect(res.status).toBe(200)
      expect(res.type).toEqual('application/json')
    })
  })
});

