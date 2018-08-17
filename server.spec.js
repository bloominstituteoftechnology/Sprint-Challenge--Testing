const request = require('supertest')(require('./server'))


describe('GET [/games]', async () => {
  
  it('should return a status code of 200', async () => {
    const res = await request.get('/games')
    expect(res.status).toBe(200)
  })
  it('should return json', async () => {
    const res = await request.get('/games')
    expect(res.type).toBe('application/json')
  })
  it('game objects should have title, genre, and releaseYear fields', async () => {
    const res = await request.get('/games')
    gameMatches = res.body.filter(game => 
      game['title'] && game['genre'] && game['releaseYear'] 
    )
    expect(res.body.length).toBe(gameMatches.length)
  })
})

describe('POST [/games]', () => {
  it('should send 400 status code if request body is missing required fields', async () => {
    const res = await request
      .post('/games')
      .send({yo: 'wassup'})
    expect(res.status).toBe(400)
  })
  it('should send 200 status code if request is valid', async () => {
    const res = await request
      .post('/games')
      .send({title: 'Halo', genre: 'FPS', releaseYear: 2001})
    expect(res.status).toBe(200)
  })
  it('should send back the data from the request body along with an id', async () => {
    const res = await request
      .post('/games')
      .send({title: 'Tekken 4', genre: 'Melee', releaseYear: 2001})
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        genre: expect.any(String),
        releaseYear: expect.any(Number)
      })
    )
  })
})
