const req = require('supertest')

const server = require('./server.js')

const statusCodePass = 200
const statusCodeFail = 404
const statusCodeInc = 422
const statusCodeNA = 405

describe('Server Testing', () => {
  it('Basic Get from root /', async () => {

    const res = await req(server).get('/')
  
    expect(res.status).toEqual(statusCodePass)
  });

  describe('Tests for /games', () => {
    it('GET /games', async () => {

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

    it('GET /games/:id with invalid id', async() => {
      const res = await req(server).get('/games/7')

      expect(res.status).toEqual(statusCodeFail)
      expect(res.body).toEqual({msg: 'ID not found'})
    });

    it.skip('GET /games/:id with valid id', async() => {
      const res = await req(server).get('/games/3')

      expect(res.status).toEqual(statusCodePass)
      expect(res.body).toEqual({msg: 'ID not found'})
    });

    it('POST /games incomplete body', async() => {
      const res = await req(server).post('/games').send({title:'Bubble Bobble'})

      expect(res.status).toEqual(statusCodeInc)
      expect(res.body).toEqual({msg: 'required fields missing'})
    });

    it('POST /games repeat title', async() => {
      const res = await req(server).post('/games').send({title:'Street Fighter', genre:'Arcade'})

      expect(res.status).toEqual(statusCodeNA)
      expect(res.body).toEqual({msg: 'Game already exists'})
    });

    

    it('POST /games complete body', async() => {
      const res = await req(server).post('/games').send({title:'Bubble Bobble', genre:'NES'})

      expect(res.status).toEqual(statusCodePass)
      expect(res.body).toMatchObject([
        {id:0, title:'Pacman', genre:'Arcade', releaseYear:'1980'},
        {id:1, title:'Street Fighter', genre:'Arcade', releaseYear:'1992'},
        {id:2, title:'Mortal Kombat', genre:'Arcade', releaseYear:'1990'},
        {id:3, title:'Super Mario', genre:'NES', releaseYear:'1986'},
        {id:4, title:'Legend of Zelda', genre:'NES', releaseYear:'1980'},
        {id:5, title:'Bubble Bobble', genre:'NES'}
      ])
    });
  });



});