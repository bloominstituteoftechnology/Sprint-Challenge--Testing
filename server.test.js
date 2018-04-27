const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');

const expect = chai.expect;
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
    const newGame = new Game({
      title: 'Contra',
      genre: 'Run-and-Gun',
      releaseDate: 'February 1987'
    })
    newGame
    .save()
    .then(savedGame => {
      gameID = savedGame._id.toString();
    })
    .catch(err => {
      console.log(err)
    })
    done();
  });

  afterEach(done => {
    Game.remove({}, err => {
      if (err) console.log(err);
      return done();
    })
  });

  describe(`[GET] /api/game/get`, () => {
    it('should get a list of all the games in this db', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .then(response => {
          const { _id, name, genre, releaseDate } = response.body[0];
          expect(response.body).to.be.an('array');
          expect(_id).to.equal(gameId);
          expect(name).to.equal('Contra');
          done();
        })
        .catch(err => {
          throw err;
        });
        done();
    });
    it.skip('Should fail if bad URL is provided', () => {}); 
  });

  describe(`[POST] /api/game/create`, () => {
    it('should save a document to the db', done => {
      chai
        .request(server)
        .post('/api/game/create')
        .send({ name: 'Donkey Kong', genre: 'Arcade', releaseDate: '1981' })
        .then(response => {
          // is res.body.length === 2?
          // console.log(response.body);
          done();
        })
        .catch(err => {
          throw err;
        });
        done();
    });
  });

  describe(`[DELETE] /api/game/destroy/:id`, () => {
    it('should remove a game from the database', done => {
      chai
      .request(server)
      .delete(`/api/game/destroy/${gameId}`)
      .then(response => {
   //     expect()
      })
      done()
    })
  })

});
