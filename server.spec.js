const mongoose = require('mongoose');
const request = require('supertest');
const server = require('./server');
const Game = require('./games/Game');

describe('Games', () => {
  const testGame = {title: 'test game', genre: 'FPS', releaseDate: '1995'};
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='));
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from Test DB ==='));
  });

  let gameId;
  // // hint - these wont be constants because you'll need to override them.
  const expectedBody = {
    title: 'Doom',
    genre: 'shooter',
    releaseDate: '1995'
  }
  beforeEach(done => {
      const newGame = new Game(expectedBody);
      newGame.save((err, saveGame) => {
        if (err) {
          console.log(err);
        }
        else {
          gameId = saveGame._id;
          console.log('gameId');
        }
        done();
      });
      // write a beforeEach hook that will populate your test DB with data
      // each time this hook runs, you should save a document to your db
      // by saving the document you'll be able to use it in each of your `it` blocks
    });
  afterEach(() => {
    Game.remove({}, err => {
      if (err) console.log('There was a problem removing the game');
      else console.log('The game was removed successfully');
    });
  });

  it('runs the tests', () => {});

  // test the POST here

  describe('post routes', () => {
  it('should create a new game', async() => {
    const game = {title: 'TestGame', genre: 'simulator', releaseDate: '2015'};
    const response = await request(server)
    .post('/api/games')
    .send(game);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("genre");
    expect(response.body).toHaveProperty("releaseDate");
    expect(response.body.title).toEqual('TestGame');
    expect(response.body.genre).toEqual('simulator');
    expect(response.body.releaseDate).toEqual('2015');
    });
  });
// test the GET here

describe('get routes', () => {

  it('returns 200', async () => {
      const response = await request(server)
      .get('/api/games')
      expect(response.status).toBe(200)
      // expect(response.body[1].title).toEqual('Doom');
      // expect(response.body.genre).toEqual('shooter');
      // expect(response.body.releaseDate).toEqual('1995');
      // expect(response.type).toEqual('application/json');
  });
  it('returns first game title', async () => {
    const response = await request(server).get('/api/games');
    expect(response.body[0].title).toEqual(expectedBody.title);
  });
  it('returns array', async() => {
    const response = await request(server).get('/api/games');
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});
      // Test the DELETE here

  describe('delete routes', () => {
    it('should delete game', async() => {
      const response = await request(server).delete(`/api/games/${gameId}`);
      expect(response.status).toBe(204);
    });
    it('throws error when deleting wrong id', async() => {
      const response = await request(server).delete(`/api/games/`);
      expect(response.status).toBe(404);
    });
  });
});
