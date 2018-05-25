const mongoose = require('mongoose');
const request = require('supertest');

const server = require('./server');
const Game = require('./games/Game');

describe('Games', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='));
  });

  let gameId;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    const newGame = new Game({
      title: 'California Games',
      genre: 'Sports',
      releaseDate: 'June 1987',
    }); //refactor later using faker
    newGame.save().then(savedGame => {
      gameId = savedGame._id;
    }).catch(err => console.log(err))
  });

  afterEach(() => {
    //   // clear collection.
    Game.remove({}, function(err) {
      console.log('collection removed')
    });
  });

  afterAll(() => {
    return User.remove().then(() => mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ===')));
  });

  it('runs the tests', () => {});

  // test the POST here
  describe('[POST] /api/games', () => {
    it('should create a new game', async () => {
      const game = new Game({
        title: 'Contra Games',
        genre: 'Action',
        releaseDate: 'June 1990',
      });
      const response = await request(server).post(`/api/games`).send(game);

      expect(response.status).toEqual(201);
      expect(response.type).toEqual('application/json');
      expect(response.body).toMatchObject({
        title: game.title,
        genre: game.genre,
        releaseDate: game.releaseDate
      });
      expect(response.body).toHaveProperty('_id');
    });

    it('should ensure that title and genre fields are provided', async () => {
      const game = new Game()
      game.validate((err) => {
        expect(err.errors.title.kind).toBe('required')
      });
      game.validate((err) => {
        expect(err.errors.genre.kind).toBe('required')
      })
    })

  })

  // test the GET here
  describe('[GET] /api/games', () => {
    it('should fetch all games', async () => {
      const response = await request(server).get('/api/games');
      expect(response.status).toEqual(200);
      expect(response.type).toEqual('application/json');
      expect(response.body).not.toBeUndefined();
      expect(response.body).toHaveLength(2);
      expect(response.body[0].title).toEqual('California Games');
    });
  });

  // Test the DELETE here
  describe('[DELETE] /api/games/:id', () => {
    it('should delete a user', async () => {
      const game = {
        title: 'California Games',
        genre: 'Sports',
        releaseDate: 'June 1987',
      };
      const newGame = await Game.create(game);
      const response = await request(server).delete(`/api/games/${newGame._id}`);
      expect(response.status).toEqual(204);
    })

    it('should ensure that a game ID is provided', async () => {
      const game = new Game();
      const response = await request(server).delete('/api/games');
      // expect(response.status).toEqual(422);
      // expect(response.body.message).toEqual('You need to give me an ID');        
    });

    it('should ensure that the game ID is valid', async () => {
      const response = await request(server).delete('/api/games');
      expect(response.status).toEqual(404);
      // expect(response.message).toEqual('Game not found');
    });

    it('should detect server error', async () => {
      const response = await request(server).delete('/api/games/null');
      expect(response.status).toEqual(500);
    });

  })

});
