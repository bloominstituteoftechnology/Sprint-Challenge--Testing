const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const chaiHttp = require("chai-http");

const server = require('./server');
const Game = require('./models');

chai.use(chaiHttp);


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
  let gameId;
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {

    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const newGame = new Game({
      title: 'Super Mario Bros',
      genre: 'Platform game',
      releaseDate: 'September 1985'
    });
    newGame.save((err, savedGame) => {
      if (err) {
        console.log(err);
        return done();
      }
      gameId = savedGame._id.toString();
      return done();
    });
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if (err) console.log(err);
      return done();
    });
  });

  // test the POST here
  describe(`[POST] /api/game/create`, () => {
    it('should save a new game to the database', done => {
      chai
        .request(server)
        .post('/api/game/create')
        .send({
          title: 'Excitebike',
          releaseDate: 'November 1984',
          genre: 'Racing'
        })
        .end((err, res) => {
          if (err) {
            console.log(err);
            return done();
          }
          expect(res.body.title).to.equal('Excitebike');
          expect(res.body.genre).to.equal('Racing');
          expect(res.body.releaseDate).to.equal('November 1984');
          return done();
        });
    });
  });

  // test the GET here
  describe(`[GET] /api/game/get`, () => {
    it('should get a list of all games in the database', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err) {
            console.log(err);
            return done();
          }
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body[0].title).to.equal('Super Mario Bros');
          expect(res.body[0].genre).to.equal('Platform game');
          return done();
        });
    });
  });

  // Test the DELETE here

  // --- Stretch Problem ---
  // test the PUT here
});
