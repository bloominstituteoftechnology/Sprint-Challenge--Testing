const mongoose = require('mongoose');
const chai = require('chai');
const chaihttp = require('chai-http');

const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
chai.use(chaihttp);

const Game = require('./models');
const data = [
  {
  title: 'The Rest Of Us',
  genre: 'Zombie',
  },
  {
    title: 'Madden NFL 2027',
    genre: 'Sports'
  },
]

describe('Games', () => {
  before(done => {
    console.log('running `before` method');
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
    console.log('running `after` method');
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
      console.log('we are disconnected');
    });
  });
  let firstGameId;
  let secondGameId;
  // let gameIds;
  // declare some global variables for use of testing
  // hint - these wont be constants because you'll need to override them.
  beforeEach(async () => {
    console.log('running `beforeEach` method')
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const game1 = new Game({
      title: 'The Rest Of Us',
      genre: 'Zombie',
    });
    const game2 = new Game({
      title: 'Madden NFL 2027',
      genre: 'Sports'
    });
    await game1.save().then(game => firstGameId = game.id);
    await game2.save().then(game => secondGameId = game.id);
  });
    // beforeEach(done => {
    //   gameIds = [];
    //   console.log('running `beforeEach` method')
    //   Promise.all(data.map(game => {
    //       return new Promise((resolve, reject) => {
    //         Game(game).save()
    //         .then(savedGame => {
    //           gameIds.push(savedGame.id);
    //           return resolve(savedGame);
    //         })
    //         .catch(err =>  reject(err));
    //       })
    //     })
    //   ).then(rv => {
    //     games = JSON.parse(JSON.stringify(rv));
    //     console.log(`I'm the returned value from the promise all: `, rv);
    //     done();
    //   })
    //   .catch(err => done(err));
    // firstGameId = games[0]._id
    // done();
    // new Game({
    //   title: 'The Rest Of Us',
    //   genre: 'Zombie',
    // }).save((err, saved) => {
    //   if (err) {
    //     console.log(err);
    //     return done();
    //   }
    //   firstGameId = saved._id;
    //   console.log('First Game ID: ', firstGameId);
    // });
    // new Game({
    //   title: 'Madden NFL 2027',
    //   genre: 'Sports'
    // }).save((err, saved) => {
    //   if (err) {
    //     console.log(err);
    //     return done();
    //   }
    //   secondGameId = saved._id;
    //   done();
    // });
  // });
  afterEach(done => {
    console.log('running `afterEach` method');
    // simply remove the collections from your DB.
      Game.remove({}, err => {
        if (err) console.error(err);
      done();
      });
    });


  // test the POST here

  describe('[POST] /api/game/create', () => {
    it('should add a new game', (done) => {
        const newGame = {
            title: 'MarioKart',
            genre: 'Racing'
        };
        chai.request(server)
        .post('/api/game/create')
        .send(newGame)
        .end((err, res) => {
            expect(res.body.title).to.equal('MarioKart');
            console.log('Post res.body: ', res.body);
            expect(res.status).to.equal(200);
            done();
        });
    });
});

  // test the GET here


  describe('[GET] /api/game/get', () => {
    it('should return a list of all the titles in your collection of games', (done) => {
        chai.request(server)
        .get('/api/game/get')
        .end((err, res) => {
            console.log('Get res.body: ', res.body);
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(2);
            expect(res.body[1].genre).to.equal('Sports')
            done();
        });
    });
  });

  // test the PUT here
  
  describe('[UPDATE] /api/game/update', () => {
    it('should update a game from your list', (done) => {
      // console.log('Update game id of second game: ', gameIds[1])
      const updatedGame = {
          id: secondGameId,
          // id: gameIds[0],
          title: 'The Rest of Them',
          genre: 'Zombie Sports',
        }
        chai.request(server)
        .put(`/api/game/update`)
        .send(updatedGame)
        .end((err, res) => {
            console.log(Object.keys(res));
            console.log('Why am I getting this 422?', res.body.error);
            expect(res.status).to.equal(200);
            expect(res.body.title).to.equal('The Rest of Them');
            done();
        });
    });
});

  // --- Stretch Problem ---
  // Test the DELETE here
  describe('[DELETE] /api/game/destroy/:id', () => {
    it('should delete a game from the list of games in your collection', (done) => {
        chai.request(server)
        .delete(`/api/game/destroy/${firstGameId}`)
        // .delete(`/api/game/destroy/${gameIds[0]}`)
        .end((err, res) => {
            console.log('Delete res.body: ', res.body);
            expect(res.status).to.equal(200);
            expect(res.body.success).to.equal('The Rest Of Us was removed from the DB');
            done();
        });
    });
  });
});
