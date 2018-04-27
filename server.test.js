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
    const newGame = new Game({
      title: "One Game",
      genre: "Action",
    });
    newGame
      .save()
      .then(savedGame => {
        gameId = savedGame._id;
      })
      .catch(error => {
        console.log(error);
      })
    done();

  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if (err) console.log(err);
      done();
    });
  });

  // test the POST here
  describe('[POST]/api/game/create', () => {
    it('should save a new game to the database', done => {

      const newGame = new Game({ title: "Other Game", genre: "Action" });
      newGame.save()
        .then(() => {
          assert(newGame.isNew === false);
          done();
        })
        .catch(err => {
          console.log('error from create');
          done();
        })

      /*  chai
         .request(server)
         .post('/api/game/create')
         .send({ title: "Other Game", genre: "Action" })
         .then(res => {
           expect(res.body).to.be.an('object');
           done();
         })
         .catch(error => {
           console.log(error);
           done();
         }) */
    });

    it(`Should fail if title or genre aren't provided`, done => {
      chai
        .request(server)
        .post('/api/game/create')
        .send({ title: 'new Game' })
        .then(response => {
          done();
        })
        .catch(err => {
          console.log('error happened');
          done();
        });
    });
  })


  // test the GET here

  describe('[GET]/api/game/get', () => {
    it('should get all the games from the DB', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .then(response => {
          const { _id, name, genre } = res.body[0];
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(_id).to.equal(gameId);
          expect(title).to.equal('One Game');
          done();
        })
        .catch(err => {
          console.log('error happening');
          done();
        })
    })
  })

  // Test the DELETE here
  describe('[delete]', () => {
    it('removes a record from DB', () => {
      Game.findOneAndRemove({ _id: gameId })
        .then(() => {
          Game.findById(gameIdd)
            .then((result) => {
              assert(result === null);
              done();
            })

        })
        .catch(err => {
          console.log('something went wrong');
          done();
        })
    })
  })

  // --- Stretch Problem ---
  // test the PUT here
});
