const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
const Game = require('./models');

chai.use(chaiHTTP);

describe('Games', () => {
  
  before(() => {
    mongoose.connect('mongodb://localhost/test');
    const db = mongoose.connection;
    
    db.on('error', () => console.error.bind(console, 'connection error'));
    db.on('connected', () => {
      console.log('we are connected');
    });
  });

  after(() => {
    const db = mongoose.connection;
    
    db.dropDatabase();
    db.close(() => {
        console.log('we are disconnected');
      });
    });

  let gameId;
  
  // hint - these wont be constants because you'll need to override them.
  
  beforeEach(() => {

    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    
    const newGame = new Game({ 
      title: 'The Legend of Zelda', 
      genre: 'Action-adventure', 
      releaseDate: '1986', 
    });
    
    newGame
      .save()
      .then((savedGame) => {
        gameId = savedGame._id;
      });
  });

  afterEach(() => {
    
    // simply remove the collections from your DB.
  
    Game
      .remove({});
  });

  // test the POST here

  describe(`[POST] /api/game/create`, () => {
    it('Should add a game to the database', () => {
      
      const testGame = {
        title: 'Metroid',
        genre: 'Action-adventure',
        releaseDate: '1986',
      };

      return chai
              .request(server)
              .post('/api/game/create')
              .send(testGame)
              .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.deep.include(testGame);
              });
    });
  });

  // test the GET here

  describe(`[GET] /api/game/get`, () => {
    it('Should find and retrieve all the games from the database', () => {
      return chai
              .request(server)
              .get('/api/game/get')
              .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body[0].title).to.equal('The Legend of Zelda');
              });
    });
  });

  // Test the DELETE here
  
  describe(`[DELETE] /api/game/destroy/id`, () => {
    it('Should delete a game from the database', () => {
      return chai
              .request(server)
              .delete(`/api/game/destroy/${gameId}`)
              .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('success');
                expect(res.body.success).to.have.string('The Legend of Zelda');
              });
    });
  });

 // --- Stretch Problem ---
  // test the PUT here

  describe(`[PUT] /api/game/update`, () => {
    it('Should update a game from the database', () => {
     
    const testGame = { 
      title: 'Super Mario Bros. 2', 
      id: gameId,
    };

      return chai
              .request(server)
              .put('/api/game/update')
              .send(testGame)
              .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.title).to.equal('Super Mario Bros. 2');
              });
    });
  });
  
});
