const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const server = require('./server');
const chaihttp = require('chai-http');

const Game = require('./models');

chai.use(chaihttp);

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
  let gameID;
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const mario = {
      title: 'Mario Bros',
      genre: 'Platform',
      releaseDate: 'June 1986',
    };
    const newGame = new Game(mario);
    newGame.save((err, savedGame) => {
      if (err) {
        console.log(err);
        return done();
      }
      gameID = savedGame._id;
      console.log(gameID);
      done();
    });
  });
  afterEach(done => {
    Game.remove({}, err => {
      if (err) {
        console.log(
          'There was an error removing the data in the afterEach hook'
        );
      }
      done();
    });
  });

  describe('[POST] api/game/post', () => {
    const newGame = {
      title: 'Donkey Kong',
      genre: 'Platformer',
    };
    it('should post the new game to the database', () => {
      chai
        .request(server)
        .post('/api/game/create')
        .send(newGame)
        .end((err, res) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(res.body.title).to.equal('Donkey Kong');
        });
    });
  });

  describe('[GET] api/game/get', () => {
    it('should send back an array of all games', () => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(res.body).to.have.length(1);
        });
    });
  });

  describe('[PUT] api/game/update', () => {
    it('should update the correct document', done => {
      chai
        .request(server)
        .put(`/api/game/update`)
        .send({ title: 'Tetris 2', id: gameID })
        .end((err, res) => {
          if (err) {
            console.log('error in end', err);
            done();
          }
          expect(res.body.title).to.equal('Tetris 2');
          done();
        });
    });
  });

  describe('[DELETE] /api/game/destroy/:id', () => {
    it('should delete the specified game', done => {
      chai
        .request(server)
        .delete(`/api/game/destroy/${gameID}`)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.body.success).to.equal('Mario Bros was removed from the DB');
          Game.findOne({ name: 'Mario Bros' }, (err, game) => {
            if (err) {
              console.log(err);
              done();
            }
            expect(game).to.equal(null);
            done();
          });
        });
    });
  });
});
