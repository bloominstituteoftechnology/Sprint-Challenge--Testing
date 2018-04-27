const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');
const server = require('./server.js');
chai.use(chaiHTTP);

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
  let gameId;
  gameTitle = "test title",
  gameReleaseDate = "test release date",
  gameGenre = "test genre"

  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {

    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const newGame = new Game({
      title: gameTitle,
      releaseDate: gameReleaseDate,
      genre: gameGenre
    });
    newGame
    .save()
    .then(savedGame => {
      gameId = savedGame._id
    })
    .catch(err => {
      console.log(err);
    });
    done();
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err=>{
      if(err) console.log(err);
      return done();
    });
  });

  // test the POST here
  describe('[put] /api/game/create', () => {
    it('should create a game', done => {
      chai
      .request(server)
      .post('/api/game/create')
      .send({
        title: "postTitle",
        releaseDate: "postReleaseDate",
        genre: "postGenre"
      })
      .then(res => {
        const { title, releaseDate, genre } = res.body;
        expect(title).to.equal("postTitle");
        expect(releaseDate).to.equal("postReleaseDate");
        expect(genre).to.equal("postGenre");
        done();
      })
      .catch(err => {
        throw err;
      });
    });
  });
  // test the GET here
  describe('[GET] /api/game/get', () => {
    it('should return a list of all the games in the db', done => {
      chai
      .request(server)
      .get('/api/game/get')
      .then(res => {
        const { _id, title, releaseDate, genre } = res.body[0];
        expect(_id).to.equal(gameId.toString());
        expect(title).to.equal(gameTitle);
        expect(releaseDate).to.equal(gameReleaseDate);
        expect(genre).to.equal(gameGenre);
        done();
      })
      .catch(err => {
        throw err;
      });
    });
  });
  // Test the DELETE here
  describe(`[DELETE] /api/game/destroy/:id`, () => {
    it('should remove a game from the db', done => {
      chai
      .request(server)
      .delete(`/api/game/destroy/{gameId}`)
      .send({id:gameId})
      .then(res => {
        done();
      })
      .catch(err => {
        throw err;
      });
    });
  });
  // --- Stretch Problem ---
  // test the PUT here
});
