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
  // declare some global variables for use of testing
  // hint - these wont be constants because you'll need to override them.
  let testGame = null
  let gameId = null
  beforeEach(done => {
    const myGame = new Game({
      title: 'bddjoo',
      genre: 'htdyjoo',
      releaseDate: 'past'
    })
    myGame
      .save()
      .then(game => {
        testGame = game
        gameId = game._id
        done()
      })
      .catch(err => {
        console.error(err);
        done();
      });

  });
  afterEach(done => {
    Game.remove({}, err => {
      if (err) console.error(err);
      done();

    })
  });
  // test the POST here
  describe(`[POST] /api/game/create`, () => {
    it('should add a new game', done => {
      const myGame = {
        title: 'Tennis',
        genre: 'Sports'
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(myGame)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Tennis');
          done();
        });
    });
    it('should send back 422 upon bad data', done => {
      const myGame = {
        title: 'Tennis',
        genre: 'Sports'
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(myGame)
      done()
        .end((err, res) => {
          if (err) {
            expect(err.status).to.equal(422);
            const { error } = err.response.body;
            expect(error).to.eql('Invalid input game sent to server');
            done();
          } //handle error
        });
    });
  });

  // test the GET here
  describe(`[GET] /api/game/get`, () => {
    it('should get all games', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err) {
            throw new Error(err);
            done();
          }
          expect(res.body[0].title).to.eql(testGame.title);
          expect(res.body[0]._id).to.equal(gameId.toString());
          done();
        });
    });
  });
  // test the PUT here
  describe(`[PUT] /api/game/update`, () => {
    it('update a document given and id and some text', done => {
      const gameUpdate = {
        id: gameId,
        title: 'Piano',
      };
      chai
        .request(server)
        .put('/api/game/update')
        .send(gameUpdate)
        .end((err, res) => {
          if (err) {
            throw new Error(err);
            done();
          }
          expect(res.body.title).to.equal(gameUpdate.title);

          done();
        });
    });

    it('handle error if bad id sent', done => {
      const gameUpdate = {
        id: 'asdfasdf',
        title: 'Piano',
        genre: 'Keyboard'
      };
      chai
        .request(server)
        .put('/api/game/update')
        .send(gameUpdate)
        .end((err, res) => {
          if (err) {
            expect(err.status).to.equal(422);
            const { error } = err.response.body;
            expect(error).to.eql('Cannot find game by that id');
          }
          done();
        });
    });
  });

  // --- Stretch Problem ---
  // Test the DELETE here
  describe(`DELETE`, () => {
    it('should delete a game', done => {
      chai.request(server)
        .delete(`/api/game/destroy/${gameId}`)
        .end((err, res) => {
          expect(res.body).to.have.property('success');
          expect(res.status).to.equal(200);
        });
      done();

    });
  });
});