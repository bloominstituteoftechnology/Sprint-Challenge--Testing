const request = require('supertest')

const server = require('./server.js')

describe('server.js', () => {
  describe('root endpoint (/)', () => {
    it('should return status code 200 OK', async () => {
      const expected = 200;

      const res = await request(server).get('/')

      expect(res.status).toEqual(expected)
    })

    it('should return JSON', async () => {

      const res = await request(server).get('/')

      expect(res.type).toEqual('application/json')
    })

    it('should return array of games', async () => {
      const expected = {"games": {
         "games": [
           {
             title: 'Pacman',
             genre: 'Arcade',
             releaseYear: '1980'
           },
           {
             title: 'Galaga',
             genre: 'Arcade',
             releaseYear: '1983'
           },
           {
             title: 'Super Mario',
             genre: 'Arcade',
             releaseYear: '1987'
           }
        ]
       } }

      const res = await request(server).get('/')

      expect(res.body).toEqual(expected)
    })

    it('should return added and the game object entered on post', async () => {
      const expected = { added: { title: 'Galaxia', genre: 'Arcade', releaseYear: '1985' } };

      const res = await request(server)
        .post('/')
        .send({ title: 'Galaxia', genre: 'Arcade', releaseYear: '1985' })

      expect(res.body).toEqual(expected)

    })

    it('should return status code 422 for missing title or genre', async () => {
      const expected = 422;

      const res = await request(server)
        .post('/')
        .send({ title: 'Galaxia', releaseYear: '1985' })

      expect(res.status).toEqual(expected)
    })

    it('should return deleted game title', async () => {
      const expected = { removed: 'Pacman' };

      const res = await request(server)
        .delete('/')
        .send({ title: 'Pacman' })

      expect(res.body).toEqual(expected)

    })

  })
})
