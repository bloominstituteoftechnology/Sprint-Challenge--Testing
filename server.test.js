const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const server = require("./server");
const chaiHttp = require("chai-http");

const Game = require('./models');

chai.use(chaiHttp);

describe('Games', () => {
  before(done => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/test');
    const db = mongoose.connection;git 
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
    new Game({
      title: "Persona 3 Portable",
      genre: "JRPG",
      releaseDate: "July 6, 2010"
    })
    .save((err, savedGame) => {
      if (err) {
        console.log(`There has been an error saving the game: \n ${err}`);
        done();
        return;
      } else {
        gameId = savedGame.id;
        console.log(`The game has been added successfully!`);
        done();
      }
    })
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if (err) console.log(`There has been an error removing the game: \n ${err}`);
      else console.log(`The game has been removed successfully!`)
    })
  });

  // test the POST here
  describe("[POST] /api/game/create", () => {
    it("should add a new game to the database", (done) => {
      const newGame = {
        title: "Phoenix Wright: Ace Attorney",
        genre: "Visual Novel",
        releaseDate: "September 1, 2006"
      };
      chai.request(server)
        .put("/api/game/create")
        .send(newGame)
        .end((err, res) => {
          if (err) return console.log(`There has been an error with the post request: \n ${err}`);
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal("Phoenix Wright: Ace Attorney");
          done();
        })
    })
  })

  // test the GET here
  describe("[GET] /api/game/get", () => {
    it("should send a list of all games stored on the database", (done) => {
      chai.request(server)
        .get("/api/game/get")
        .end((err, res) => {
          if (err) return console.log(`There has been an error with the get request: \n ${err}`);
          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body[0].title).to.equal("Persona 3 Portable");
          expect(res.body.length).to.equal(2);
          done();
        })
    })
  })


  // test the PUT here
  describe("[PUT] /api/game/update", () => {
    it("should update the game document in the database", (done) => {
      const updatedGame = {
        id: gameId,
        title: "Undertale",
        genre: "Turn Based RPG",
        releaseDate: "September 15, 2015"
      };

      chai.request(server)
        .put("/api/game/update")
        .send(updatedGame)
        .end((err, res) => {
          if (err) {
            console.log(`There was an error with the put request: \n ${err}`);
            return done(err);
          };
          expect(res.body.title).to.equal("Undertale");
          expect(res.body.genre).to.equal("Turn Based RPG");
          expect(res.body.releaseDate).to.equal("September 15, 2015");
          done();
        })
    })
  })

  // --- Stretch Problem ---
  // Test the DELETE here
  describe("[DELETE] /api/game/destroy/:id", () => {
    it("should remove the game with the given id from the database", (done) => {
      chai.request(server)
        .delete("/api/game/destroy/:id")
        .end((err, res) => {
          if (err){
            console.log(`There was an error with the delete request: \n ${err}`);
            return done(err);
          }
          expect(res.text).to.equal('success');
          Game.findById(gameId, (err, res) => {
            if (err){
              console.log(`There was an error checking for the deleted game: \n ${err}`);
              return done(err);
            }
            expect(res).to.equal(null);
            done();
          })
        })
    })
  })
});
