const mongoose = require('mongoose');
const request = require('supertest'); //added supertest
const server = require('./server') //added server
const Game = require('./games/Game');

describe('Games', () => {
 beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='));
  });
  
 afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  let gameId, game;
  // // hint - these wont be constants because you'll need to override them.
 
  beforeEach(async () => {
      // write a beforeEach hook that will populate your test DB with data
      // each time this hook runs, you should save a document to your db
      // by saving the document you'll be able to use it in each of your `it` blocks
      game = { title: 'Mad Max', genre: 'action', releaseDate: 'Sept 2015' };
      const savedGame = await Game.create(game);
      gameId = savedGame._id;
  });

  afterEach(() => {
        // clear collection.
      return Game.remove();
    });
  
//----------------------------------------------------------------------------------------------------------------
  it('runs the tests', () => {});

//The POST method should take in an object

  // test the POST here
  it('Should POST New Game', async () => {
    const game = new Game({ title: 'Mad Max', genre: 'action', releaseDate: 'Sept 2015' });
    const response = await request(server).post('/api/games').send(game);

    expect(response.status).toEqual(201);
    expect(response.type).toEqual('application/json');
    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toEqual('Mad Max');
    expect(response.body).toMatchObject({ title: 'Mad Max', genre: 'action', releaseDate: 'Sept 2015' });
  });

  it('Should Require Title/Genre Mandatory Input Fields', async () => {
    const game = new Game()
    game.validate((err) => {
      expect(err.errors.title.kind).toBe('required')
    });
    game.validate((err) => {
      expect(err.errors.genre.kind).toBe('required')
    });
});

//----------------------------------------------------------------------------------------------------------------

//Our get method should return the list of games. REMINDER That this data structure returned from Mongo will be an array, so to test your game with a beforeEach hook you'll need to make sure you test against the first item in the array

  // Test the GET here
  it('Should GET List of Games', async () => {
    const response = await request(server).get('/api/games');

    expect(response.status).toEqual(200); // Returns 200 Status Ok!
    expect(response.type).toEqual('application/json');
    expect(response.body[0].title).toEqual('Mad Max');
  });

  it('Should Return an Array via GET, not a String', async () => {
    const response = await request(server).get('/api/games');

    expect(response.body).not.toBe('string');
    expect(Array.isArray(response.body)).toBe(true);
  });

//----------------------------------------------------------------------------------------------------------------

//DELETE can take an ID off of the route parameter and delete the corresponding game if it exists or return a 404 and an object with a message if the game does not exist in the database.

  // Test the DELETE here
  it('Should DELETE Game', async () => {
    const response = await request(server).delete(`/api/games/${gameId}`);

    expect(response.status).toEqual(204);
  });

  it('Should DELETE Existing Game by ID', async () => {
    const savedGame = await Game.create(game)

    request(server)
      .delete(`/api/games/${savedGame._id}`)
      .expect(204) // Returns 204 mssg proving game has been deleted successfully! 
  });

  it('Should Return 404 Error if Trying to DELETE without Valid ID', async () => {

    request(server)
      .delete(`/api/games/25`) // ID of 25 entered to show this is invalid ID
      .expect('Content-Type', 'application/json')
      .expect(404) // Returns 404 mssg if valid ID is not provided upon Deleting 
  });

//----------------------------------------------------------------------------------------------------------------

//Just like in class, send up the information you want changed on the server via the req.body.

  // Test the PUT here (STRETCH)
  it('Should Be Able to Update Game', async () => {
    const savedGame = await Game.create(game)
    const update = { title: 'Mad Max', genre: 'action', releaseDate: 'Sept 2015' }

    request(server)
    .put(`/api/games/${savedGame._id}`)
    .send(update)

    .expect(200) // Returns 200 Status Ok!
    .expect(response => response.body.title === 'Mad Max')
    .expect(response => response.body.genre === 'action')
    .expect(respose => response.body.releaseDate === 'Sept 2015')
  });
});