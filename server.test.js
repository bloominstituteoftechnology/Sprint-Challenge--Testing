const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const chaiHTTP = require('chai-http');
const sinon = require('sinon');

const Game = require('./models');
const server = require('./server');

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
  let gameId = null;
  let testedGame = null;
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const testedGame = new Game({
      title: 'Hello Kitty',
      genre: 'Kitty World',
      releaseDate: 'January, 2001'
    });
    testedGame
      .save()
      .then(game => {
        testGame = game;
        gameId = game._id;
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if(err) console.log(err);
      done();
    });
  });

  // test the POST here
  
describe(`[POST] /api/game/create`, () => {
  it('should add a new game to the collection', done => {
    const testGame = {
      title: 'Hello Kitty',
      genre: 'Kitty World',
      releaseDate: 'January, 2001'
    };
    chai
      .request(server)
      .post('/api/game/create')
      .send(testGame)
      .end((err, res) => {
        console.log(res.body);
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('Hello Kitty')
        done();
      });
  });
  it (`should send back '422: Invalid input data sent to Server' upon bad data`, () => {
    const testGame = {
      title: 'Hello Kitty',
      genre: 'Kitty World',
      releaseDate: 'January, 2001'
    };
    chai
      .request(server)
      .post('/api/game/create')
      .send(testGame)
      .end((err, res) => {
        if(err) {
          expect(err.status).to.equal(422);
          const { error } = err.response.body;
          expect(error).to.equal('Invalid input data sent to the Server')
          done();
        }
      });
  });
});  

  // test the GET here

describe(`[GET] /api/game/get`, () => {
  it('should retreive a list of all the games', done => {
    chai
      .request(server)
      .get('/api/game/get')
      .then(response => {
        const { _id, name, genre, releaseDate } = response.body[0];
        expect(response.status).to.equal(200);
        //expect(response.body).to.be.an('array');
        //expect(_id).to.equal(gameId);
        expect(name).to.equal('Hello Kitty');
        done();
      })
      .catch(err => {
        throw err;
      });
    });
    it.skip('Should fail if bad URL is provided', () => {});
  });
}); 

  // Test the DELETE here

describe(`[DELETE] /api/game/destroy/:id`, () => {
  it('should delete a game with the provided id from the collection', done => {
    chai  
    .request(server)
    .delete(`/api/game/destroy/${gameId}` )
    .end((err, res) => {
      if (err) {
        console.error(err);
        return done();
      }
      expect(res.status).to.equal(200);
      expect(res.text).to.equal('success');
      Game.findById(gameId, (err, deletedGame) => {
        if(err) {
          console.log(err);
          return done();
        }
        expect(deleteGame).to.equal(null);
        done();
      });
    });
  });
});  

  
  // --- Stretch Problem ---
  // test the PUT here
