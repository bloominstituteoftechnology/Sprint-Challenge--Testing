const request = require('supertest')
const server = require('./index')


describe('GET [/games]', () => {
    it('should return a 200 status code', async () => {
      const res = await request(server)
        .get('/games')
      expect(res.status).toBe(200)
    })

    it('should return JSON response', async () => {
      const res = await request(server).get('/games')
      expect(res.type).toEqual('application/json')
    })

    it('games should have title and genre fields', async () => {
      const res = await request(server).get('/games')
      gameMatches = res.body.filter(game => game['title'] && game['genre'])
      expect(res.body.length).toBe(gameMatches.length)
    })
  })

describe('POST [/games]', () => {
  it('should return status 422 if request is missing required fields', async () => {
    const res = await request(server)
      .post('/games')
      .send({title: ''})
    expect(res.status).toBe(422)
  })

  it('should return status 201 if request is valid', async () => {
    const game = {
      title: 'CallofDooty', 
      genre: 'Shooter' 
    }
     const res = await request(server)
      .post('/games')
      .send(game)
      .expect(201)
  })

  it('should return with an id', async () => {
    const game = {
      title: 'MarioBros',
      genre: 'SideScroller',
      releaseYear: '1992'
    }
    const res = await request(server)
      .post('/games')
      .send(game)
    expect(res.body[1].id).toEqual(2)
  })
})