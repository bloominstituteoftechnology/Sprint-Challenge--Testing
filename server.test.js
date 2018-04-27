const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
const Game = require('./models');

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
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    // needs title, releaseDate, and genre
    const fortnite = {
      title: 'Fortnite',
      genre: 'Battle Royale',
      releaseDate: 'January 2017'
    }
    const game = new Game(fortnite);
    game.save((err, savedGame) => {
      if (err) {
        console.log(err);
        // return done();
        done();
      }
      gameId = savedGame._id;
      done();
    });
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if (err) console.log(err);
      done();
    });
  });

  // test the POST here
  describe('[POST] /api/game/create', () => {
    it('should add a new game', done => { 
      const pubg = {
        title: 'PUBG',
        genre: 'Battle Royale',
        releaseDate: 'September 2016'
      };

      chai.request(server)
      .post('/api/game/create')
      .send(pubg)
      .end((err, res) => {
        if (err) {
          // assert that err should be type status etc.
          console.log(err); // this was done this way due to being short on time
          done();
        }
        expect(res.body.title).to.equal('PUBG');
        done();
      });
    });
    it('should have a status code of 200', done => { 
      const pubg = {
        title: 'PUBG',
        genre: 'Battle Royale',
        releaseDate: 'September 2016'
      };
      
      chai.request(server)
      .post('/api/game/create')
      .send(pubg)
      .end((err, res) => {
        if (err) {
          // assert that err should be type status etc.
          console.log(err); // this was done due to being short on time
          done();
        }
        expect(res.status).to.equal(200);
        done();
      });
    });
  })

  // test the GET here
  // Post first, then test assertions on get
  describe('[GET] /api/game/get', () => {
    it('should return list of all games', done => {
      const madden = {
        title: 'Madden 18',
        genre: 'Sports',
        releaseDate: 'August 2017'
      };
      
      chai.request(server)
      .post('/api/game/create')
      .send(madden)
      .end((err, res) => {

      });

      chai.request(server)
      .get('api/game/get')
      .end((err, res) => {
        console.log(res);
        if (err) {
          console.log('ERROR:', err);
          done();
        }
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(2);
        expect(res.body[0].title).to.equal('Fortnite')
        done();
      });
    });
  })

  // Test the DELETE here
  
  // --- Stretch Problem ---
  // test the PUT here
});
