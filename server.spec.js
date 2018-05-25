const mongoose = require('mongoose');
const request = require('supertest');
const server = require('./server.js');

const Game = require('./games/Game');

describe('Games', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/test').then(() => console.log('\n=== connected to TEST DB ==='));
  });

  afterAll(() => {
    return mongoose.disconnect().then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  let gameId; // only used to test delete
  //  hint - these wont be constants because you'll need to override them.

  beforeEach(() => {
    const newGame = new Game({title: 'League of Legends', genre: 'MOBA', releaseDate: 'October 27, 2009'}).save((err, savedGame) => {
      if (err) {
        console.log(`There was an error saving the game.`);
        return;
      } else {
        gameId = savedGame.id;
        console.log(`The game was added successfully!`);
      }
    });
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
  });

  afterEach(() => {
    //    clear collection.
    Game.remove({}, err => {
      if (err)
        console.log(`There was an error removing the game.`);
      else
        console.log(`The game was removed successfully.`);

      }
    );
  });

  it('runs the tests', () => {}); // dummy test
  // ----------------------------------------------------------------------------

  // test the POST here
  describe('post', () => {

    it('should the POST at api/games for saving a new game if title and genre is provided', async () => {

      let response;

      const anotherGame = new Game({title: 'League of nothing', genre: 'MOBAKOBA', releaseDate: 'October 27, 2018'})

      try {
        response = await request(server).post('/api/games').send(anotherGame);

      } catch (err) {
        console.log(err);
      }
      // removing the excess body._V and body._id to match our input-----------------------------ask austin
      // delete response.body.__v;
      // delete response.body._id;
      // expect(response.body).toEqual(anotherGame);
      expect(response.body.title).toEqual(anotherGame.title);
      expect(response.body.genre).toEqual(anotherGame.genre);
      expect(response.body.releaseDate).toEqual(anotherGame.releaseDate);
      expect(response.status).toBe(201);
      expect(response.type).toBe('application/json');

    })

    it('should send server error status code  if  both title and genre is  not provided', async () => {
      let response;

      try {
        response = await request(server).post('/api/games').send(new Game({title: 'League of Legends', releaseDate: 'October 27, 2009'}));
      } catch (err) {
        console.log(err);
      }
      expect(response.status).toBe(500);
    })

  })
  // ---------------------------------------------------------------------------
  // test the GET here

  describe('get', () => {
    it('should the GET at api/games return an array', async () => {

      let response;

      try {
        response = await request(server).get('/api/games');
      } catch (err) {
        console.log(err);
      }

      expect(Array.isArray(response.body)).toEqual(true)
    })

    it('should the GET at api/games return an array of objects', async () => {

      let response;

      try {
        response = await request(server).get('/api/games');
      } catch (err) {
        console.log(err);
      }
      expect(typeof response.body[0]).toEqual('object')
    })

    it('should the GET at api/games for fetching all the games', async () => {
      let response;
      try {
        response = await request(server).get('/api/games');
      } catch (err) {
        console.log(err);
      }
      expect(response.body[0].title).toEqual('League of Legends')
      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
    })
  })

  // --------------------------------------------------------------

  // Test the DELETE here

  // describe('delete', () => {
  //   it('should delete a document if proper id is given', async () => {
  //
  //     let response;
  //
  //     try {
  //       response = await response(server).delete(`/api/games/${gameId}`);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //      expect(response.status).toEqual(204);---------------------------------------------ask austin
  //   })

  it('should delete a document if proper id is given with a 204 status code', async () => {
    const game = {
      title: "test test delete",
      genre: "DELETE",
      releaseDate: "October 27, 2009"
    }
    const document = new Game(game)
    const {_id} = document
    return document.save()
    .then(async () => {
      const response = await request(server).delete(`/api/games/${_id}`)
      expect(response.status).toBe(204)
    })
  })

  it('should return a 500 because the id doesnt exist', async () => {
    const response = await request(server).delete(`/api/games/123as`);
    expect(response.status).toEqual(500);
  })
  it('should return a 404 because of a missing id', async () => {
    const response = await request(server).delete(`/api/games/`);
    expect(response.status).toEqual(404);
  })
})
});
