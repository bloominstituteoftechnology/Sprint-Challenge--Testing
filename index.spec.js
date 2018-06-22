const mongoose = require('mongoose');
const request = require('supertest');
const server = require('./api/server');
const Game = require('./games/Game');

// The POST method should take in an object that looks like this

// {
//   title: 'California Games',
//   genre: 'Sports',
//   releaseDate: 'June 1987'
// }


// server.post('/api/games', (req, res) => {
//   Game.create(req.body)
//     .then(game => {
//       res.status(201).json(game);
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ message: 'Error saving data to the DB', error: err });
//     });
// });


// server.get('/api/games', (req, res) => {
//   Game.find({})
//     .then(games => {
//       res.status(200).json(games);
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ message: 'Something really bad happened', error: err });
//     });
// });

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

  beforeEach(async () => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
 
    const expectedBody = {
      title: 'California Games',
      genre: 'Sports',
      releaseDate: 'June 1987'
    };

    const game = await Game.create(expectedBody);

  });

  afterEach(async () => {
    //   // clear the games collection.
    await Game.remove();
  });



  
   // test the GET here

   it(`should return OK and a json object from '/' route` , async () => {

    const expectedBody = { api: 'running!' };
    const expectedStatusCode = 201;

    const response = await request(server).get('/');

    expect(response.status).toEqual(expectedStatusCode);
    expect(response.body).toEqual(expectedBody);
    expect(response.type).toEqual('application/json');

  });

  // test the POST here

  it('runs the tests', () => {

  });


  // Test the DELETE here

  it('runs the tests', () => {

  });

});



