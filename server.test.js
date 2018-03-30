const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const server = require('./server');
const Game = require('./models');

const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

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
  // declare some global variables for use of testing
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    mongoose.connect('mongodb://localhost/test');
    new Game({
      title: 'Zelda II: The Adventure of Link',
      genre: 'Adventure',
      releaseDate: 'Jan 14, 1987',
    }).save((err, savedGame) => {
      if (err) {
        console.log(err);
        done(err);
      };
      gameId = savedGame.id;
      done();
    });
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, (err) => {
      if (err) {
        console.log(err);
        return done();
      };
      mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close()
        done();
      });
    });
  });

  // test the POST here
  describe('[POST] /api/game/post', () => {
    it('Should add a new game to the collection', async function(){
      const newGame = {
        title: 'Duck Hunt',
        genre: 'Light Gun Shooter',
      };
      // const promise = new Promise((resolve, reject) => {
      //   resolve(chai.request(server).post('/api/game/create').send(newGame));
      // });
      const res = await Promise.resolve(chai.request(server).post('/api/game/create').send(newGame));
      expect(res.status).to.equal(200);
      expect(res.body.title).to.equal('Duck Hunt');
    });
  });

  // test the GET here
  describe('[GET] /api/game/get', () => {
    it('Should return all the games in the db', async function() {
      const res = await Promise.resolve(chai.request(server).get('/api/game/get'));
      expect(res.status).to.equal(200);
      expect(Array.isArray(res.body)).to.equal(true);
      expect(res.body.length).to.equal(1);
    });
  });

  // test the PUT here
  describe('[PUT] /api/game/update', () => {
    it('Should update the targeted game document', async function(){
      const updatedGame = {
        id: gameId,
        title: 'Metroid',
      }
      const res = await Promise.resolve(chai.request(server).put('/api/game/update').send(updatedGame));
      expect(res.body.title).to.equal('Metroid');
    })
  })

  // --- Stretch Problem ---
  // Test the DELETE here
});
