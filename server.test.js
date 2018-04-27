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
    const game = new Game({
      title: 'Super Mario Bros.',
      releaseDate: '1980',
      genre: 'platform?'
    });
    game
      .save()
      .then(addGame => {
        // console.log(addGame);
        gameId = addGame._id.toString();
      })
      .catch(error => {
        console.log(error);
      });
    done();
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove().then((result, error) => {
      if (error) {
        console.log(error);
      } else {
        return done();
      }
    });
  });

  // test the POST here
  describe('POST on /api/game/create', () => {
    it('should post document to video-games db', done => {
      chai
        .request(server)
        .post('/api/game/create')
        .send({
          title: 'Super Mario Bros.',
          releaseDate: '1980',
          genre: 'platform?'
        })
        .then(res => {
          // console.log(res.body);
          const { _id, title, releaseDate, genre } = res.body;
          expect(res).to.be.json;
          expect(_id, title, releaseDate, genre).to.exist;
          done();
        })
        .catch(error => {
          throw error;
        });
    });
  });
  // test the GET here
  describe('GET on /api/game/get', () => {
    it('should get an array of all games', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .then(res => {
          const { _id, title, releaseDate, genre } = res.body[0];
          expect(res.body).to.be.an('array');
          expect(res.body[0]).to.be.an('object');
          done();
        })
        .catch(error => {
          throw error;
        });
    });
  });
  // Test the DELETE here
  describe('DELETE on /api/game/destroy/:id', () => {
    it('should remove a document from db', done => {
      chai
        .request(server)
        .delete(`/api/game/destroy/${gameId}`)

        .then(res => {
          console.log(`${gameId}`);
          const { success } = res.body;
          expect(success).to.be.a('string');
          done();
        })
        .catch(err => {
          throw err;
        });
    });
  });
  // --- Stretch Problem ---
  // test the PUT here
  describe('PUT on /api/game/update', () => {
    it('should update a game title, releaseDate, genre', done => {
      chai
        .request(server)
        .put('/api/game/update')
        .send({
          title: 'Super Mario Bros.',
          releaseDate: '1980',
          genre: 'platform?'
        })
        .end((err, res) => {
          if (err) {
            return err;
          }
          const { _id, title, releaseDate, genre } = res.body;
          expect(title).to.equal('Super Mario Bros.');
          expect(releaseDate).to.equal('1980');
        });
      done();
    });
  });
});
