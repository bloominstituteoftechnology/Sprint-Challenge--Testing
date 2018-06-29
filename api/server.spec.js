const mongoose = require('mongoose');
const Game = require('../games/Game');
const server = require('./server');
const request = require('supertest')


describe('The API Server', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='))
      .catch(err => {
        console.log('error connecting to TEST database, is MongoDB running?');
      });
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  let gameId;

  beforeEach(async ()  => {
    const superMarioOdyssey = { title: 'Super Mario Odyssey', genre: 'Action/Platformer', releaseDate: '29/Dec/2017' }
    const savedGame = await Game.create(superMarioOdyssey);
    gameId = savedGame._id;
  });

  afterEach(() => {
    return Game.remove();
  });

  describe('POST to /api/games', () => {
    it('return 201 status code when game created', async () => {
      const geow = {
        title: 'Gears of War 4',
        genre: 'Cover Shooter',
        releaseDate: '03/04/2017'
      };
          const response = await request(server)
            .post('/api/games')
            .send(geow)
      
            expect(response.status).toBe(201)
    })
    it('returns object with id/title/genre/releaseDate', async () => {
      const gow4 = {
        title: 'God of War 4',
        genre: 'Action/Adventure',
        releaseDate: '01/05/2018'
      };
          const response = await request(server)
            .post('/api/games')
            .send(gow4)
      
            expect(response.body._id).toBeTruthy()
            expect(response.body.title).toBe('God of War 4')
            expect(response.body.genre).toBe('Action/Adventure')
            expect(response.body.releaseDate).toBe('01/05/2018')
    })
  })

  describe('GET to /api/games', () => {
    it('returns 200 status code when games are accessed', async () => {
      const response = await request(server).get('/api/games');
      
      expect(response.status).toBe(200);
    })
    it("returns 200 status code when games can't be accessed", async () => {
      
      const response = await request(server).get('/api/games/' + gameId);
      
      
      expect(response.body.title).toBe('Super Mario Odyssey')
      expect(response.body.genre).toBe('Action/Platformer')
      expect(response.body.releaseDate).toBe('29/Dec/2017')
    })
    
    it('returns status code 404 when no game found', async () => {
      const response = await request(server).get('/api/games/1');

      expect(response.status).toEqual(404);
    })
  })

  describe('DELETE to /api/games', () => {
    it('returns status code 422 if no id found', async () => {
      const response = await request(server).get('/api/games/1');

      expect(response.body._id).toBe(undefined);
    })
    it('returns status code 204 if id found and game deleted', async () => {
      const response = await request(server).get('/api/games/' + gameId);

      expect(response.status).toEqual(204);
    })
    it('returns status code 404 if id not available', async () => {
      const response = await request(server).delete('/api/games/');

      expect(response.status).toEqual(404);
    })
  })
})
