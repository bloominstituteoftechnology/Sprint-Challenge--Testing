const mongoose = require('mongoose');
const request = require('supertest'); //needed to run tests on CRUD endpoints
const server = require('./api/server.js');

const Game = require('./games/Game');

describe('The API Server', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='))
      .catch(err => {
        console.log('error connecting to TEST database, is MongoDB running?');
      });
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  let gameId;
  // // hint - these wont be constants because you'll need to override them.
  let testGame;
  let deleteGame;
  
  beforeEach(async () => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    testGame = {
      title: 'whatever',
      genre: 'idontplaygames',
      releaseDate: '1983',
    };

    gameId = await Game.create(testGame);
  });

  afterEach(() => {
    //   // clear the games collection.
    return Game.remove(); //totally stolen from my User.spec from yesterday, which was totally stolen from Luis.
  });

  it('runs the tests', () => {});

  // test the POST here

  it('should post new games', async() => {
   // const newGame = { title: 'newgame', genre: 'puzzle', releaseDate: '2000' }; I don't need this because of the beforeEach
    const response = await request(server).post('/api/games').send(testGame);

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('genre');    
  });

  it('should return error if post is missing required information', async() => {
    const game2 = { genre: 'what', releaseDate: '2018' };
    const response = await request(server).post('/api/games').send(game2);

    expect(response.status).toEqual(500);
    expect(response.body.message).toEqual('Error saving data to the DB');
    
  });
  
  // test the GET here

  it('should return a status of 200 from the /api/games route', async() => {
    const response = await request(server).get('/api/games');
    expect(response.status).toEqual(200);
  });

  it('should have a title and genre for each game in the list', async() => {
    const response = await request(server).get('/api/games');
    expect(response.body[0]).toHaveProperty('title');
    expect(response.body[0]).toHaveProperty('genre');
  });

  // Test the DELETE here

  it('should return 204 status upon successfully deleting', async() => {
    const response = await request(server).delete(`/api/games/${gameId._id}`); //It took me forever to figure out how to specify an ID here
    expect(response.status).toEqual(204);
  });

  it('should return 404 status if game is not found in database', async() => {
    const response = await request(server).delete('/api/games/5b2d271f9f9c341f79482fb0'); //I tried using gameId, but I didn't work, probably because we want something NOT in the database. Regular numbers like 123 didn't work so I used an existing game id and switched the last 2 letters around. This way, it looked like a game ID but wasn't one.
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Game not found');
  });

  //Stretch - PUT testing

  it('should return 422 status if put request does not include title and id', async() => {
    const response = await request(server).put(`/api/games/${gameId._id}`);
    expect(response.status).toEqual(422);
    expect(response.body.error).toBe('Must Provide a title && Id');
    
  });

  it('should return 200 status if game is successfully updated', async() => {
    const game3 = { title: 'game3', genre: 'what', _id: `${gameId._id}` };
    const response = await request(server).put(`/api/games/${gameId._id}`).send(game3);
    expect(response.status).toBe(200);

  });

  
});

