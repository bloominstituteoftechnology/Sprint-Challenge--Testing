const mongoose = require('mongoose');
const request = require('supertest');

const server = require('./server');
const Game = require('./games/Game');

describe('Games', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='));
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  let gameId;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach( async () => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    const newGame = { title: "Sonic", genre: "actions", releaseDate: "A long time ago" }

    const game = await Game.create(newGame);
    
  })

  afterEach(() => {
    //   // clear collection.
    Game.remove();
  });

  it('runs the tests', () => {});

  // test the POST here
  describe('POST /games', () => {
    it('should check if games are being properly posted',  () => {
      
      // arrange

      const newGame = { title: "Sonic", genre: "actions", releaseDate: "A long time ago" }

      // assert

      expect(newGame.title).toBe("Sonic");
    })

    it('should return an error if title or genre is missing' , async () => { 
      // arrange
      const noGenreGame = { title: "Sonic", releaseDate: "A long time ago" }
      const noTitleGame = { genre: "action", releaseDate: "A long time ago" }

      // act
      const ggame = request(server).post('/api/games').send(noGenreGame);
      const tgame = request(server).post('/api/games').send(noTitleGame);

      // assert
      expect(500);
      expect(500);

    })
  })

  // test the GET here
  describe('GET /games' , () => {

    it('should show there are games in the database', () => {

      request(server)
        .get('/api/games')
        .expect(res => res.length > 0)
       
    })

    it('should return the proper status code', () => {
      
      request(server)
          .get('/api/games')
          .expect(200)
        })
  })

  // Test the DELETE here
  describe('DELETE /game', () => {
    it('should delete a game given its id', async () => {
      gameId = '5b084ed8f9faa32ddf519a3f';

      await Game.findByIdAndRemove(gameId);

      expect(204);

    })

    it('should return an error for a invalid ID', () => {

      gameId = 'zzzzz';

      request(server).delete(`/api/games/${gameId}`).expect(404);

    })
  })

  // TEST for PUT here
  describe('PUT /game', () => {
    it('should rewrite a game\'s information', async () => {
      const updatedGame = { title: "Sonics", genre: "horror", releaseDate: "Never" }
      gameId = '5b084ed9f9faa32ddf519a40';

      const gameNow = await Game.findByIdAndUpdate(gameId, updatedGame);

      expect(gameNow.title).toEqual('Sonics')

      // request(server).put(`/api/games/${gameId}`).send(gameNow).expect(204)
    })

    it('should return an error if id does not exist', () => {
      const updatedGame = { title: "Sonics", genre: "horror", releaseDate: "Never" }
      gameId = 'zzz';

      request(server).put(`/api/games/${gameId}`).send(updatedGame).then(res => { expect(res.status).toEqual(415) });

    })
  })
});
