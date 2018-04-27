const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const should = chai.should();
const chaiHTTP = require('chai-http');

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

    const newGame = new Game({
      title: 'Metal Gear Solid',
      genre: 'Tactical Espionage Action',
      releaseDate: 'March 31, 1998'
    });
    newGame
      .save()
      .then(savedGame => {
        gameId = savedGame._id.toString();
      })
      .catch(err => {
        console.log(err);
      });
      done();
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if(err) console.log(err);
      return done();
    });
  });

  // test the POST here

  describe(`[POST] /api/game/create`, () => {
    it('should save a game doc to the db', done => {
      chai
        .request(server)
        .post('/api/game/create')
        .send({ title: 'Sonic The Hedgehog', 
                genre: 'Platformer', 
                releaseDate: 'June 23, 1991'
                })
        .then(res => {
          done();
        })
        .catch(err => {
          throw err;

        });
    });
  });

  // test the GET here

  describe(`[GET] /api/game/get`, () => {
    it('should retrieve the games', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .then(response => {
          const {_id, title, genre} = response.body[0];
          expect(_id).to.equal(gameId);
          expect(title).to.equal('Metal Gear Solid')
          done();
        })
        .catch(err => {
          throw err;
        });
    })
    it.skip('Fail if bad URL', () => {});
  });

  // Test the DELETE here


  describe(`[DEL] /api/game/destroy/:id`, () => {
    it('should delete the game', done => {
      const game = new Game({ title: 'Halo', genre: 'FPS'})
      game.save((err, game) => {
        chai
        .request(server)
        .delete('/api/game/destroy/' + game._id)
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });

      })


    })
  })

  
  // --- Stretch Problem ---
  // test the PUT here
});
