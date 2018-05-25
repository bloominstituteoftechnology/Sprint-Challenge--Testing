const mongoose = require('mongoose');
const request = require('supertest');
const server = require('./server');
const Game = require('./games/Game');

describe('Games', () => {

  const newGame = { title: 'messing with mongoose', genre: 'sci-fi', releaseDate: '3141' }

  beforeAll(() => mongoose.connect('mongodb://localhost/test').then(() => console.log('\n=== connected to TEST DB ===')))

  afterAll(() => mongoose.disconnect().then(() => console.log('\n=== disconnected from TEST DB ===')))

  afterEach(() => Game.remove())

  it('runs the tests', () => {});

  describe('POST', () => {
    it('should create a new game', async () => {
      const response = await request(server).post('/api/games').send(newGame)
      expect(response.status).toBe(201)
      expect(response.type).toBe('application/json')
    })
  
    it('should throw an error when a new game POST does not meet all requirements', async () => {
      const noTitle = { genre: 'sci-fi', releaseDate: '3141' }
      const noGenre = { title: 'messing with mongoose', releaseDate: '3141' }
      await request(server).post('/api/games').send(noTitle).then(res => expect(res.status).toBe(500))
      await request(server).post('/api/games').send(noGenre).then(res => expect(res.status).toBe(500))
    })
  
    it('should allow a user to POST a game without a release date', async () => {
      const noRelease = { title: 'messing with mongoose', genre: 'sci-fi' }
      await request(server).post('/api/games').send(noRelease).then(res => expect(res.status).toBe(201))
    })
  })

  describe('GET', () => {
    it('should fetch all games from database', async () => {
      const savedGame = await Game.create(newGame)
      const anotherGame = await Game.create({ title: 'jeffrey', genre: 'flynn' })

      await request(server).get('/api/games').then(res => {
        expect(res.status).toBe(200)
        expect(res.type).toBe('application/json')
      })
    })

    it('should fetch a game with provided ID', async () => {
      const savedGame = await Game.create(newGame)
      const response = await request(server).get(`/api/games/${savedGame._id}`)
      expect(response.status).toBe(200)
      expect(response.body.title).toEqual(newGame.title)
      expect(response.body.genre).toEqual(newGame.genre)
      expect(response.body.releaseDate).toEqual(newGame.releaseDate)
    })

    it('should return an error if an invalid ID is provided', async () => {
      await request(server).get('/api/games/123').then(res => {
        expect(res.status).toBe(500)
        expect(res.type).toBe('application/json')
      })
    })
  })

  describe('DELETE', () => {
    it('should delete an existing game if a proper ID is provided', async () => {
      const savedGame = await Game.create(newGame)
      await request(server).delete(`/api/games/${savedGame._id}`).then(res => expect(res.status).toBe(204))
    })
  
    it('should return an error if no ID is provided for DELETE', async () => {
      await request(server).delete('/api/games').then(res => expect(res.status).toBe(404))
    })
  
    it('should return an error if an invalid ID is provided for DELETE', async () => {
      await request(server).delete('/api/game/123').then(res => expect(res.status).toBe(404))
    })
  })

  describe('PUT', () => {
    it('should be able to update an existing user', async () => {
      const savedGame = await Game.create(newGame)
      const updates = { title: 'jeffrey', genre: 'flynn' }
      await request(server).put(`/api/games/${savedGame._id}`).send(updates).then(res => {
        expect(res.status).toBe(200)
        expect(res.type).toBe('application/json')
        expect(res.text).toContain('jeffrey')
      })
    })
  
    it('should return an error for a PUT request with no title', async () => {
      const savedGame = await Game.create(newGame)
      const updates = { genre: 'jeffrey' }
      await request(server).put(`/api/games/${savedGame._id}`).send(updates).then(res => {
        expect(res.status).toBe(422)
        expect(res.type).toBe('application/json')
      })
    })
  
    it('should return an error for a PUT request with an invalid ID', async () => {
      await request(server).put('/api/games/123').then(res => {
        expect(res.status).toBe(422)
        expect(res.type).toBe('application/json')
      })
    })
  })
});
