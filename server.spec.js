const req = require('supertest')

const server = require('./server.js')

const statusCodePass = 200
const statusCodeFail = 400
const statusCodeInc = 422

describe('Server Testing', () => {
  it('Basic Get from root /', async () => {

    const res = await req(server).get('/')
  
    expect(res.status).toEqual(statusCodePass)
  });

  describe('Tests for /games', () => {
    describe('GET /games', async () => {

      const res = await req(server).get('/games')

      expect(res.status).toEqual(statusCodePass)
      expect(res.body).toMatchObject([
        {id:0, title:'Pacman', genre:'Arcade', releaseYear:'1980'},
        {id:1, title:'Street Fighter', genre:'Arcade', releaseYear:'1992'},
        {id:2, title:'Mortal Kombat', genre:'Arcade', releaseYear:'1990'},
        {id:3, title:'Super Mario', genre:'NES', releaseYear:'1986'},
        {id:4, title:'Legend of Zelda', genre:'NES', releaseYear:'1980'},
      ])
    });
  });
});