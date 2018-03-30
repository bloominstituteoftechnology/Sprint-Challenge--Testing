const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const server = require('./server.js');

const Game = require('./models');

const db = mongoose.connection;

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
  beforeEach(done => {
    const newGame = new Game({
      title: 'baseball2018',
      genre: 'Sports'
    });
    newGame
      .save()
      .then(game => {
        testGame = game;
        gameID = game._id;
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
    afterEach(done => {
      const newGame = new Game;
      newGame
        .save()
        .then(res => {
          res.status.json(200);
        })
        .catch(err => {
          console.error(err);
        })
        .done();
      // simply remove the collections from your DB.
    });
    describe('Server', () => {
      describe('[POST] /game', () => { // test the POST here
        it('should add a new game', () => {
          const newGame = {
            title: 'California Games',
            genre: 'Sports',
            date: 'June 1987'
          };
          chai.request(server)
            .post('/game')
            .send(newGame)
            .end((err, res) => {
              if (err) console.error(err);
              expect(res.status).to.equal(200);
              expect(res.body.title[0]).to.equal('California Games');
            });
        });
      });

      describe('[GET] /games', () => { // test the GET here
        it('should return all games', () => {
          chai.request(server)
            .get('/games')
            .end((err, res) => {
              if (err) console.error(err);
              expect(res.status).to.equal(200);
              expect(res.body.title[0]).to.equal('/games');
            });
        });
      });

      describe('[PUT]', () => { // test the PUT here
        it('should edit a game', () => {
          const { title } = req.params;
          const game = req.body;
          chai.request(server); //idk if this is right syntax @ patrick :eyes:
          game.findOneAndUpdate({ title }, game, { new: true });
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('California Games');
        });
      });
    });
    describe('[DELETE]', () => {  // --- Stretch Problem ---  // Test the DELETE here
      it('should delete a game', () => {
        const { title } = req.params;
        const game = req.body;
        game.findOneAndDelete({ title }, game);
        //idk if this is right syntax @ patrick :eyes:
        chai.request(server)
          .delete('/game')
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.title).to.equal(null);
          });
      });
    });
  });
});
