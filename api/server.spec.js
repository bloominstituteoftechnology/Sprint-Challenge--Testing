const mongoose = require('mongoose');
const request = require('supertest');

const Game = require('../games/Game');
const server = require('./server');

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

    const testGame = { 
      title: 'Final Fantasy',
      genre: 'RPG',
      releaseDate: 'before games were cool' }

      return Game.create(testGame)
        .then(testGame => {
          return testGame
        })
        .catch(error => {
          return error
        })

    // request(server)
    //   .post('/api/games')
    //   .send(newGame)
    //   .end(function (err, res) {
    //     if(err) return done(err);
    //     let gameId = res.body._id
    //     done()
    //   })

    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
  });

  afterEach(() => {
    return Game.remove()
    //   // clear the games collection.
  });

  it('runs the tests', () => {});

  it('successfully returns posted status', (done) => {
    const newGame = { 
      title: 'Final Fantasy',
      genre: 'RPG',
      releaseDate: 'before games were cool' }
      console.log(testGame)

    request(server)
      .post('/api/games')
      .send(newGame)
      .end(function (err, res) {
        if(err) return done(err);
        expect(res.status).toBe(201)
        done()
      })
  })

  it('successfully returns games db', (done, newGame) => {
    request(server)
      .get('/api/games')
      .end(function (err, res) {
        if(err) return done(err);
        expect(res.status).toBe(200)
        expect(res.json).toEqual(newGame)
        done()
      })
  })

  // it('successfully returns games db', (done, gameId) => {
  //   let gameIdTest = 12
  //   expect(gameId).toBe(gameIdTest)
  // })


  // it('successfully deletes posted game', (done, gameId) => {
  //  let gameIdTest = 12
    
    // const newGame = { 
    //   title: 'Final Fantasy',
    //   genre: 'RPG',
    //   releaseDate: 'before games were cool' }
      // expect(gameIdTest).toBe(gameId)
    // request(server)
    //   .post('/api/games')
    //   .send(newGame)
    //   .end(function (err, res) {
    //     if(err) return done(err);
    //     done()
    //   })

    // request(server)
    // .del('/api/games')
  // })

  // Test the DELETE here
});
