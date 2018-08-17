const request = require('supertest')

const server = require('./server')

describe('GET [/games]', async () => {
  
  it('should return a status code of 200', async () => {
    const res = await request(server).get('/games')
    expect(res.status).toBe(200)
  })
  it('should return json', async () => {
    const res = await request(server).get('/games')
    expect(res.type).toBe('application/json')
  })
  it('game objects should have title, genre, and releaseYear fields', async () => {
    const res = await request(server).get('/games')
    gameMatches = res.body.filter(game => 
      game['title'] && game['genre'] && game['releaseYear'] 
    )
    expect(res.body.length).toBe(gameMatches.length)
  })
})
