const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const chaiHTTP = require('chai-http');

const Game = require('./models');
const server = require('./server.js');

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
      title:'Castlevania',
      genre: 'Horror Side-scroller',
    });

    game.save()
    .then(newGame => {
      gameId = newGame._id;
      done();
    })
    .catch(err => {
      console.log(err);
      done();
    });

    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if (err)
        console.log(err);
      done();
    });
  });

  // test the POST here
  describe('[POST] /api/game/create', () => {
    it('Should add a new game to the database', done => {
      chai
      .request(server)
      .post('/api/game/create')
      .send({title: 'Super Mario Bros.', genre: 'Side-Scroller', releaseDate:'1987'})
      .then(response => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body.title).to.equal('Super Mario Bros.');
        return done();
      })
      .catch(err => {
        console.log(err);
        done();
      })
    })
  })
  //test the GET here
  describe('[GET] /api/game/get', () => {
    it('Should get a list of all the games in the db', done => {
      chai
      .request(server)
      .get('/api/game/get')
      .then(response => {
        expect(response.status).to.equal(200);
        expect(response.body[0].title).to.equal('Castlevania');
        expect(response.body).to.be.an('Array');
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
    });
  });
  // Test the DELETE here
  describe('[DELETE] /api/game/destroy/:id', () => {
    it('should delete a document from the database', done => {
      chai
      .request(server)
      .delete(`/api/game/destroy/${gameId}`)
      .then(response => {
        expect(response.status).to.equal(200);
        expect(response.body.success).to.equal('Castlevania was removed from the DB');
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
    });
  });
  // --- Stretch Problem ---
  // test the PUT here
});
