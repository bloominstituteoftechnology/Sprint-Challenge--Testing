const mongoose = require('mongoose');
const request = require('supertest');
const server = require('./server.js');

const Game = require('./games/Game');

describe('Games', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/test').then(() => console.log('\n=== connected to TEST DB ==='));
  });

  afterAll(() => {
    return mongoose.disconnect().then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  let gameId;
  //  hint - these wont be constants because you'll need to override them.

  beforeEach(() => {
    const newGame = new Game({title: 'League of Legends', genre: 'MOBA', releaseDate: 'October 27, 2009'}).save((err, savedGame) => {
      if (err) {
        console.log(`There was an error saving the game.`);
        done();
        return;
      } else {
        gameId = savedGame.id;
        console.log(`The game was added successfully!`);
      }
    });
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
  });
  afterEach(() => {
    //    clear collection.
    Game.remove({}, err => {
      if (err)
        console.log(`There was an error removing the game.`);
      else
        console.log(`The game was removed successfully.`);

      }
    );
  });

  it('runs the tests', () => {});

  // test the POST here
  it('tests the POST at api/games', async () => {

    const newGame = {
      title: 'Pokemon Super Myster Dungeon',
      genre: 'Adventure',
      releaseDate: 'November 20, 2015'
    };
    let response;

    try {
      response = await request(server).post('/api/games').send(newGame);
    } catch (err) {
      console.log(err);
    }
    //removing the excess body._V and body._id to match our input
    delete response.body.__v;
    delete response.body._id;

    expect(response.status).toBe(201);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual(newGame);


  })

  // ----------------------------
  // test the GET here

  // Test the DELETE here
});
