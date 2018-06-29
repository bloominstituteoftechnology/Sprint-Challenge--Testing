const mongoose = require('mongoose');
const server = require('./server');
const request = require('supertest');
const Game = require('../games/Game');

describe('The API Server', () => {

  let gameId = {title: "The Legend of Zelda", genre: "Action/Adventure", releaseDate:"August 22, 1987"};

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


  // // hint - these wont be constants because you'll need to override them.

  beforeEach(() => {


    Game.create(gameId);
    console.log(gameId);
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
  });

  afterEach(() => {
    //   // clear the games collection.
    Game.remove();
  });

  it('should receive correct status when posted', async () => {
    const response = await request(server)
      .post('/api/games')
      .send(gameId);

    expect(response.status).toBe(201);
  });

  it('should receive correct data when posted', async () => {
    const response = await request(server)
    .post('/api/games')
    .send(gameId)

    expect(response.body.title).toEqual("The Legend of Zelda");
    expect(response.body.releaseDate).toEqual("August 22, 1987");
    expect(response.body.genre).toContain("Action");
    expect(response.body.genre).toContain("Adventure");
  });


  // test the POST here

  it('should get an object(array) when fetched', async () => {
    const response = await request(server)
    .get('/api/games')
    expect(typeof response.body).toEqual("object");

  });

  it('should receive correct status when fetched', async () => {
    const response = await request(server)
    .get('/api/games')
    .query({title: "The Legend of Zelda"})
    .then(function (res){
      expect(res.status).toBe(200);

    });
  })

  it('should receive correct data when fetched (title and genre are required)', async () => {
    const response = await request(server)
    .get('/api/games')
    .query({title: "The Legend of Zelda"})
    .then(function (res){
      expect(res.body[0].title).toEqual("The Legend of Zelda");
      expect(res.body[0].genre).toEqual("Action/Adventure");
    });
  });

  // test the GET here


it('should receive correct status code and message when deleted', async () => {
  const post = await request(server)
  .post('/api/games')
  .send(gameId);


  const deleted = await request(server)
   .delete(`/api/games/5b3639e00d2f671aa484ba80`)
     expect(deleted.status).toBe(404);
     expect(deleted.text).toContain("Game not found")
   });
   });
