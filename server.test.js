const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const chaiHTTP = require('chai-http');
const Game = require('./models');
chai.use(chaiHTTP);
const server = require('./server');

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
  let gameId;
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const newGame = new Game({
      title: 'WOW',
      genre: 'MMO',
      date: '2004'
    });
    newGame.save((err, game) => {
      if (err) return done(err);
      gameId = game.id;
      gameTitle = game.title;
      done();
    });
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove((err) => {
      if (err) return done(err);
      done();
    });
  });

  // test the POST here
  describe(`[POST] /api/game/create`, () => {
    it('should create a new game', done => {
      const gameData = {
        title: 'WarCraft',
        genre: 'Real-time strategy',
        date: '2003'    
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(gameData)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.title).to.eql('WarCraft');
          expect(res.body.date).to.eql('2003');
          done();
        });
    });

    it('should give an error when the game does not have title', done => {
      const gameData = {
        genre: 'Real-time strategy',
        date: '2003'
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(gameData)
        .end((err, res) => {
          expect(err.response.body.error).to.eql('Error saving data to the DB');
          done();
        });
    });
  });

  // test the GET here
  describe(`[GET] /api/game/get`, () => {
    it('should give all the games', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.eql(1);
          expect(res.body[0].title).to.eql('WOW');
          done();
        });
    });
  });
  // test the PUT here
  describe(`[PUT] /api/game/update`, () => {
    it('should update the game title by given id and new title', done => {
      const update = {
        id: gameId,
        title: 'World of WarCraft'
      };
      chai
        .request(server)
        .put('/api/game/update')
        .send(update)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.title).to.eql('World of WarCraft');
          done();
        });
    });

    it('should give an error if title is missing', done => {
      const update = {
        id: gameId
      };
      chai
        .request(server)
        .put('/api/game/update')
        .send(update)
        .end((err, res) => {
          expect(err.response.body.error).to.eql('Must Provide a title && Id');
          done();
        });
    });

    it('should give an error if game is not found by given id', done => {
      const update = {
        id: 1,
        title: 'WOW'
      };
      chai
        .request(server)
        .put('/api/game/update')
        .send(update)
        .end((err, res) => {
          expect(err.response.body.error).to.eql('Cannot find game by that id');
          done();
        });
    });
  });

  // --- Stretch Problem ---
  // Test the DELETE here
  describe(`[DELETE] /api/game/destroy/:id`, () => {
    it('should delete the game by given id from req.params.id', done => {
      chai
        .request(server)
        .delete(`/api/game/destroy/${gameId}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.success).to.eql(`${gameTitle} was removed from the DB`);
          done();
        });
    });
    it('should delete the game by given id from req.body', done => {
      chai
        .request(server)
        .delete('/api/game/destroy/:id')
        .send({ id: gameId })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.success).to.eql(`${gameTitle} was removed from the DB`);
          done();
        });
    });

    it('should give an error if id is not provided via req.body', done => {
      chai
        .request(server)
        .delete('/api/game/destroy/:id')
        .send({})
        .end((err, res) => {
          expect(err.response.body.error).to.eql('Cannot find game by that id');
          done();
        });
    });

    it('should give an error if id is not provided via req.params', done => {
      chai
        .request(server)
        .delete(`/api/game/destroy/${{}}`)
        .end((err, res) => {
          expect(err.response.body.error).to.eql('Cannot find game by that id');
          done();
        });
    });

    it('should give an error if id is not provided', done => {
      chai
        .request(server)
        .delete('/api/game/destroy/1111')
        .end((err, res) => {
          expect(err.response.body.error).to.eql('Cannot find game by that id');
          done();
        });
    });
    it('should give an error if id is not provided', done => {
      chai
        .request(server)
        .delete('/api/game/destroy/')
        .end((err, res) => {
          expect(err.response.body.error).to.eql('You need to give me an ID');
          done();
        });
    });
  });
});
