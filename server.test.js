const request = require('supertest')
const server = require('./server.js')

describe('server.js', () => {
  it('should return status code 201 (created)', async () => {
    const response = await request(server).post('/').send({
      Title: 'Red Dead',
      Genre: '3rd person Shooter',
      releaseYear: '2018'
    })
    expect(response.status).toEqual(201)
    expect(response.type).toEqual('application/json')
    expect(response.body).toEqual({ msg: 'okayy mgame added' })
  })
})
describe('server.js', () => {
  it('should return status code 200 (delted done)', async () => {
    const id = 5
    const response = await request(server).delete(`/api/delete/${id}`)
    expect(response.status).toEqual(200)
    expect(response.body).toEqual({ msg: `Game of ${id} deleted.` })
  })
})
