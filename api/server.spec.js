const mongoose = require('mongoose');
const server = require('./server');
const Game = require('../games/Game');
const request = require('supertest');

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
  // I think it is game._id?

  let newGame;

  beforeEach(async () => {
    // do we put a mock state in here to populate before each test? If so...

    const defaultGame = {
      title: 'Bubble Bobble',
      genre: 'comical action platformer',
      releaseDate: '1986'
    }

    newGame = await Game.create(defaultGame)
    gameId = newGame._id

  });

  afterEach(() => {
    return Game.remove()
  });

  describe('Server should POST to /api/games', () => {
    it('should return a 201 code for newly created game model', async () => {
      const tetris = {
        title: 'Tetris',
        genre: 'puzzle strategy',
        releaseDate: '1984'
      }

     const response = await request(server)
        .post('/api/games')
        .send(tetris)
  
        .expect(201)
  
    });

    it('should return object with title, genre, ID, and release date', async() => {
      const contra = {
        title: 'Contra',
        genre: 'shooter like COD',
        releaseDate: 'before any of us were born'
      }

      const response = await request(server)
        .post('/api/games')
        .send(contra)

        expect(response.body.title).toBe('Contra')
        expect(response.body.genre).toBe('shooter like COD')
        expect(response.body.releaseDate).toBe('before any of us were born')
        expect(response.body._id).not.toBeUndefined()

    });

    describe('Server should GET to /api/games' , () => {
      it('should return status code 200 at GET endpoint /api/games', async() => {
        await request(server)
          .get('/api/games')

          .expect(200)
      });

      it('should return list of all games', async() => {
        const MM2 = {
          title: 'Mega Man 2',
          genre: 'platform shooter',
          releaseDate: '1988'
        }

        const testResponse = await request(server)
          .post('/api/games')
          .send(MM2)

          const response = await request(server).get('/api/games')

          expect(response.body).toContainEqual(testResponse.body)


      });

      describe('Server should DELETE at /api/games', () => {
        // test if id is undefined
        it('should see if request ID is undefined', async () => {
          const response = await request(server).delete('/api/games/20')

          expect(response.body._id).toBe(undefined)

        });

        it('should DELETE the found game at /api/games', async() => {
          await request(server)
            .delete('/api/games' + gameId)

          .expect(204)
        })
      })
    })
  })
})

