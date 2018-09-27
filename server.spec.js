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

  beforeEach(() => {
      const newGame = new Game({
        title: 'Doom',
        genre: 'shooter',
        releaseDate: '1995'
      }).save((err, saveGame) => {
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
  it('should create a new game', async() => {
    const game = {title: 'TestGame', genre: 'simulator', releaseDate: '2015'};
    const respone = await request(server)
    .post('/api/games')
    .send(game);
    expect(respone.status).toBe(201);
    expect(respone.body).toHaveProperty("_id");
    expect(respone.body).toHaveProperty("title");
    expect(respone.body).toHaveProperty("genre");
    expect(respone.body).toHaveProperty("releaseDate");
    expect(respone.body.title).toEqual('TestGame');
    expect(respone.body.genre).toEqual('simulator');
    expect(respone.body.releaseDate).toEqual('2015');
});
// test the GET here
// Test the DELETE here
  })


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

  // it('gets game from database', async () => {
  //     const response = await request(server)
  //     .get('/api/games')
  //     expect(response.status).toEqual(200)
  //     expect(response.body[0].title).toEqual('SuperGame');
  //     expect(response.body[0].genre).toEqual('Super');
  //     expect(response.body[0].releaseDate).toEqual('Today');
  //     expect(response.type).toEqual('application/json');
  // })
  
      // Test the DELETE here

//       ### Write tests for the "DELETE" method

// * `DELETE` can take an ID off of the route parameter and delete the corresponding game if it exists or return a 404 and an object with a message if the game does not exist in the database.

  // it('deletes game from database', async() => {
  //     const response = await request(server)
  //     .delete(`/api/games/${gameId}`);
  //     expect(response.status).toEqual(404);
  //   })
