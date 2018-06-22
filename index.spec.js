const mongoose = require('mongoose');

const Game = require('./games/Game');
const server = require('./api/server');
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
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
  });

  afterEach(() => {
    //   // clear the games collection.
    Game.remove();
  });

  it('runs the POST tests', async(done) => {
      // test the POST here
    const NESGameSchema = { title: "Super Mario Bros.", genre: "platformer", releaseDate: "09-22-1984" }
    const userGame = await Game.create(NESGameSchema)

    expect(userGame.title).toEqual("Super Mario Bros.")
    done();
  });




  it('runs the GET tests', async() => {
    // test the GET here
    const expectedStatusCode = 200;
    const NESGameSchema = { title: "Super Mario Bros.", genre: "platformer", releaseDate: "09-22-1984" }


    const response = await request(server).get('/api/games')

    expect(response.status).toEqual(expectedStatusCode);
 //expect(response.body).toEqual(NESGameSchema);
    expect(response.type).toEqual('application/json')
  });
  
  it('runs a DELETE test ', async (done) => {
    const NESGameSchema = { title: "Super Mario Bros.", genre: "platformer", releaseDate: "09-22-1984" }

    //do a post request to our API server(server.js)
    const deleteGame = await Game.remove(NESGameSchema)


    expect(deleteGame.tile).not.toEqual('Super Mario bros.');
    done();
  })
  // Test the DELETE here
});
