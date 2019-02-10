const request = require('supertest')
const app = require('./app')

describe('Games GET', () => {
  test('GET should return with status code 200', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
  })

  test('GET should return an array', async () => {
    const response = await request(app).get('/')
    expect(Array.isArray(response.body)).toBe(true)
  })


})

describe('Games POST', () => {
  test('POST should return with status code 200', async () => {
    const body = {
      title: 'Test Title',
      genre: 'Test Genre'
    }

    const response = await request(app).post('/').send(body)
    expect(response.statusCode).toBe(200)
  })

  test('POST should return an array', async () => {
    const body = {
      title: 'Test Title',
      genre: 'Test Genre'
    }

    const response = await request(app).post('/').send(body)
    expect(Array.isArray(response.body)).toBe(true)
  })

  test('POST should fail if title exists', async () => {
    const body = {
      title: 'Test Title',
      genre: 'Test Genre'
    }

    const response1 = await request(app).post('/').send(body)
    const response2 = await request(app).post('/').send(body)

    expect(response2.statusCode).toBe(500);
  })
})