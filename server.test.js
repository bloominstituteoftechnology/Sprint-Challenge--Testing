const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const server = require('./server');
const chaiHTTP = require('chai-http');
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
      title: 'League of Legends',
      genre: 'MOBA',
      releaseDate: 'October 27, 2009'
    }).save((err, savedGame) => {
      if (err) {
        console.log(`There was an error saving the game.`);
        done();
        return;
      } else {
        gameId = savedGame.id;
        console.log(`The game was added successfully!`);
        done();
      }
    });
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if (err) console.log(`There was an error removing the game.`);
      else console.log(`The game was removed successfully.`);
    });
  });

  // test the POST here
  describe('[POST] /api/game/post', () => {
    it('Should add a new game to the database', done => {
      const newGame = {
        title: 'Pokemon Super Myster Dungeon',
        genre: 'Adventure',
        releaseDate: 'November 20, 2015'
      };
      chai
        .request(server)
        .post('/api/game/post')
        .send(newGame)
        .end((err, res) => {
          console.log(res.body);
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Pokemon Super Myster Dungeon');
          done();
        });
    });
  });

  // test the GET here
  describe('[GET] /api/game/get', () => {
    it('Should send a list of all games stored on the database', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err)
            return console.log(`There was an error with the get request.`);
          expect(res.status).to.equal(200);
          expect(res.body[0].title).to.equal('League of Legendsd');
          expect(res.body.length).to.equal(2);
          done();
        });
    });
  });

  // Test the DELETE here
  describe('[DELETE] /api/game/delete/:id', () => {
    it('should remove the game with the given id from the database', done => {
      chai
        .request(server)
        .delete('/api/game/delete/:id')
        .end((err, res) => {
          if (err) {
            console.log(`There was an error deleting the game.`);
            return done(err);
          }
          expect(res.text).to.equal('success');
          Game.findById(gameId, (err, res) => {
            if (err) {
              console.log(`Cannot find the game.`);
              return done(err);
            }
            expect(res).to.equal(null);
            done();
          });
        });
    });
  });

  // --- Stretch Problem ---
  // test the PUT here
});
