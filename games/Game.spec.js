const mongoose = require('mongoose');

const Game = require('./Game');

describe('The Game Model', () => {
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

  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    // const game = { title: `Bonk's Adventure`, genre: 'platform'};
  
    // // const gameDocu =  Game.create(game);

    // return game.save(function(err, game) {
    //   console.log(game.title + 'saved to game collection');
    // })

  });



  it('should return OK and a json object from /api/games route', async () => {

    const expectedBody = { api: 'running!' };
    const expectedStatusCode = 201;

    const response = await request(server).get('/api/games');

    expect(response.status).toEqual(expectedStatusCode);

    expect(response.type).toEqual('application/json');

    expect(response.body).toEqual(expectedBody);

  });


  it('runs the tests', () => {});

  

  // test away!

  });