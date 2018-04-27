const mongoose = require("mongoose");
const chai = require("chai");
const chaiHTTP = require('chai-http');
const { expect } = chai;
const sinon = require("sinon");
const morgan = require('morgan');

chai.use(chaiHTTP);
const server = require('./server')
const Game = require("./models");

describe("Games", () => {
  before(done => {
    mongoose.Promise = global.Promise; // Ryan: 'This is an old school approach"
    mongoose.connect("mongodb://localhost/test");
    const db = mongoose.connection;
    db.on("error", () => console.error.bind(console, "connection error"));
    db.once("open", () => {
      console.log("we are connected");
      done();
    });
  });

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
      console.log("we are disconnected");
    });
  });
  let gameId;
  // hint - these wont be constants because you'll need to override them.
  // write a beforeEach hook that will populate your test DB with data
  // each time this hook runs, you should save a document to your db
  // title
  // genre
  // releaseDate
  // by saving the document you'll be able to use it in each of your `it` blocks
  beforeEach(done => {
    const game = new Game({
      title: "Super Mario Brothers",
      genre: "Action-Adventure",
      releaseDate: "1990"
    });
    game.save((err, savedGame) => {
      if (err) return done();
      gameId = savedGame._id.toString();
      done();
    });
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove();
    gameId = null;
    done();
  });

  // test the POST here
  describe('[POST] /api/game/create', () => {
    it('should add a new game object to the database', done => {
      const createBand = {
        title: 'BonJovi the Game',
        genre: 'Classic Rock RPG',
        releaseDate: '1984',
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(createBand)
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          // expect(response.status).to.equal(201);
          expect(response.body).to.haveOwnProperty('_id');
          expect(response.body).to.haveOwnProperty('title');
          expect(response.body).to.haveOwnProperty('genre');
          expect(response.body).to.haveOwnProperty('releaseDate');
          done();
        });
    });
  });



  // test the GET here
  describe(`[GET] /api/game/get`, () => {
    it('should get a list of all the games in the db', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(response.status).to.equal(200);
          expect(response.body).to.be.lengthOf(3);
          done();
        });
    });
  });

 

  // Test the DELETE here
// RYAN's Solution:

// describe('Delete', () => {
//   it('should delete a record removing from db', done => {
//     chai
//       .request(server)
//       .delete(`/api/game/destroy/${gameId}`)
//       .end((err, response) => {
//         if (err) console.log(err);
//         const { success } = response.body;
//         expect(response.status).to.equal(200);
//         expect(success).to.be.a('string');
//         // expect(success).to.equal(`${gameTitle} was removed from the DB`);
//         done();
//       });
//   });

//   it('should handle a bad id', done => {
//     chai
//       .request(server)
//       .delete(`/api/game/destroy/noop`)
//       .end((err, response) => {
//         if (err) {
//           const { error } = err.response.body;
//           expect(error).to.be.a('string');
//           expect(error).to.equal('Cannot find game by that id');
//           expect(err.response.clientError).to.be.ok;
//           expect(err.response.status).to.equal(422);
//         }
//         done();
//       });
//   });
// });

// AJ's Approach:

describe('[DELETE] /api/game/destroy/:id', done => {
  it('should delete a game object on the database', done => {
    chai
      .request(server)
      .delete(`/api/game/destroy/${gameId}`)
      .end((err, response) => {
        const { success } = response.body;
        if (err) {
          console.log(err);
        } else {
          expect(response.status).to.equal(200);
          expect(success).to.be.a('string');
        }
        done();
      });
  });
});

  // --- Stretch Problem ---
  // test the PUT here
  describe('[PUT] /api/game/update/:id', () => {
    it('should update a game object on the database', done => {
      const updatedGame = {
        id: gameId,
        title: 'skilletopia',
        genre: 'Rocksop',
        releaseDate: '1983'
      };
      chai
        .request(server)
        .put(`/api/game/update/${gameId}`)
        .send(updatedGame)
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(response.body).to.haveOwnProperty('_id');
          expect(response.body).to.haveOwnProperty('title');
          expect(response.body).to.haveOwnProperty('genre');
          expect(response.body).to.haveOwnProperty('releaseDate');
          expect(response.body.title).to.equal(updatedGame.title);
          done();
        });
    });
  });
});
