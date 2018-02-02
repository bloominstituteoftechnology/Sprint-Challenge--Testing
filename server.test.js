const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const Game = require('./models');

describe('Games', () => {
  before(done => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/test');
    const db = mongoose.connection;
    db.on('error', () => console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('we are connected');
      done();
    });
  });

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
      console.log('we are disconnected');
    });
  });
  // declare some global variables for use of testing
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    new Game({
      title: 'What am I'
    }).save((err, savedGame) => {
      if (err) {
        console.log(err);
        return done();
      }
      gameId = savedGame.id;
      done();
    });
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, (err) => {
      if (err) console.log(err);
      done();
    });
  });

  // test the POST here
  server.post('Games', (req, res) => {
    const movie = new Game(req.body);
    movie.save((err, newGame) => {
      if (err) return res.send(err);
      res.send(newGame);
    });
  });

  // test the GET here
  server.get('Games', (req, res) => {
    res.json({ text: 'Games Collection' });
  });

  // test the PUT here
  server.put('Games', (req, res) => {
    Game.findById(req.body.id, (err, movies) => {
      games.title = req.body.title;
      games.save((err, updatedGame) => {
        if (err) return res.send(err);
        res.send(updatedGame);
      });
    });

  // --- Stretch Problem ---
  // Test the DELETE here
});
