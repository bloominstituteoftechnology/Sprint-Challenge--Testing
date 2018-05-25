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

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  let gameId;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(() => {
    const newGame = new Game({
      title: "Counter Strike",
      genre: "pif-paf",
      releaseDate: "late 2000s", 
    });
    
    Game.create(newGame)
    .then(savedGame => {
      gameId = savedGame._id.toString();
      //console.log(savedGame);
    })
    .catch(err => console.log(err));
  
  });

  afterEach(() => {
    //   // clear collection.
    //console.log(gameId);
    return Game.remove({});
  });

  // test the POST here
  it('should save a document to the database', async () => {
      const anotherGame = {
        title: "Need For Speed",
        genre: "arcade",
        releaseDate: "90s something"
      }
      
      const response = await request(server).post('/api/games').send(anotherGame);
      //gameId = response.body._id;
      //console.log('response: ', response.body);
      
      expect(response.status).toEqual(201);
      expect(response.type).toEqual('application/json');
      expect(response.body.title).toEqual(anotherGame.title);
      //expect(response.body._id).toEqual(gameId)
    });
    
  it('should fail if name or genre arent provided', async () => {
    const anotherGame = {
      genre: "arcade",
      releaseDate: "90s something"
    }
    
    const response = await request(server).post('/api/games').send(anotherGame);
    
    expect(response.status).toEqual(500);
    expect(response.body.message).toEqual('Error saving data to the DB');
      
  });

  // test the GET here
  
  it('should get the list of the games from database', async () => {
    
    const response = await request(server).get('/api/games');
    console.log(response.body);
    
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].title).toEqual('Counter Strike');
    expect(response.body[0]._id).toEqual(gameId)
    
  });

  // Test the DELETE here
});
