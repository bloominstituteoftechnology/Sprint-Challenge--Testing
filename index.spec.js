const mongoose = require('mongoose');
const request = require('supertest');
const server = require('./index.js');
const Game = require('./games/Game');

// The POST method should take in an object that looks like this

// {
//   title: 'California Games',
//   genre: 'Sports',
//   releaseDate: 'June 1987'
// }

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
  });

  it('runs the tests', () => {});

  // test the POST here

  // test the GET here

  // Test the DELETE here
});
