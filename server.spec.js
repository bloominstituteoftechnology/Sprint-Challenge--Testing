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
  beforeEach(() => {
      const newGame = new Game(expectedBody).save((err, saveGame) => {
        if (err) {
          console.log('Error saving');
          return;
        }
        else {
          gameId = saveGame.id;
          console.log('Game was Saved');
        }
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
// Test the DELETE here


  // ```js
  // {
  //   title: 'California Games',
  //   genre: 'Sports',
  //   releaseDate: 'June 1987'
  // }
  // ```

  // test the GET here

//   * Our get method should return the list of games.
// * **REMINDER** That this data structure returned from Mongo will be an array, so to test your game with a `beforeEach` hook you'll need to make sure you test against the first item in the array

//   ```js
//   expect(res.data[0].foo).to.equal(bar.foo);
//   ```

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

//       ### Write tests for the "DELETE" method

// * `DELETE` can take an ID off of the route parameter and delete the corresponding game if it exists or return a 404 and an object with a message if the game does not exist in the database.

  // it('deletes game from database', async() => {
  //     const response = await request(server)
  //     .delete(`/api/games/${gameId}`);
  //     expect(response.status).toEqual(404);
  //   })
});
