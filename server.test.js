const mongoose = require('mongoose');
const chaihttp = require('chai-http');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
const Game = require('./models');

chai.use(chaihttp);

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
	let videogameId;
  // declare some global variables for use of testing
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
			mongoose.connect('mongodb://localhost/test');
      new Game({
			  title: 'Final Fantasy IV',
				genre: 'Role Playing Game',
				releaseDate: 'November 23, 1991',
			}).save((err, newlystoredGame) => {
				if (err) {
				console.log(err);
				done(err);
			};
			 videogameId = newlystoredGame.id;
			 done();
			});
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
  });
  afterEach(done => {
    Game.remove({}, err => {
				if (err) console.log(err);
				done();
	  	});
			mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close();
				done();
        });  
 
			// simply remove the collections from your DB.
  });

  // test the POST here
  describe('[POST] /api/game/post', () => {
		it('should add a new game', done => {
				const newVideoGame = {
				  title: 'Resident Evil 6',
					genre: 'third-person shooter',
			 };

			 chai
			   .request(server)
				 .post('/api/game/create')
				 .send(newVideoGame)
				 .end(err, res) => {
				   if (err) {
					   console.error(err);
						 done();
					}
					expect.equal(res.body.title, 'Resident Evil 6');
					expect.equal(res.status, 200);
					done();
					});
	      };

  // test the GET here
	 describe('[GET] /api/game/get', () => {
		 it('should return all the games', done => {
				 chai
				   .request(server)
					 .get('/api/game/get')
					 .end(err, res) => {
					   if (err) {
						 console.error(err);
						 done();
						}
						expect.equal(res.status, 200);
						expect.isArray(res.body);
						expect.lengthOf(res.body, 1);
				    });
		     });

  // test the PUT here
   describe('[PUT] /api/game/update', () => {
			 it('should update the specified game', done => {
					 const updatedGame = {
					   id: videogameId,
						 title: 'Resident Evil 4',
					}
					chai 
					  .request(server)
						.put('/api/game/update')
						.send(updatedGame)
			      expect.equal(res.body.title, 'Resident Evil 4');
					})
	     })
  // --- Stretch Problem ---
  // Test the DELETE here
});
