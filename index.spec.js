const mongoose = require('mongoose');

const Game = require('./games/Game');

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
    // http://mongoosejs.com/docs/populate.html
    // NESGameSchema.pre


  });

  afterEach(() => {
    //   // clear the games collection.
    return Game.remove();
  });

  it('runs the tests', () => {});

  // test the POST here
  it('POST api/games', () => {

  })

  // test the GET here
  it('GET api/games', async () => {
    const expectedStatusCode = 200;
    const response = await requestAnimationFrame(server).get('api/games');

    expect(response.status).toEqual(expectedStatusCode);
    expect(response.type).toEqual('application/json');
  })

  // Test the DELETE here
  it('DELETE api/games/:id', () => {
    const expectedStatusCode = 204;
    const response = await request(server).delete(`/api/games/${gameId}`);

    expect(response.status).toEqual(expectedStatusCode);
    expect(response.type).toEqual('application/json');
  })

});
