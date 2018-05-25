const mongoose = require('mongoose');
const request = require("supertest")
const Game = require('./games/Game');
const server = require('./server');
const express = require('express')


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
    const body = {
      title: "Halo 5",
      genre: "FPS",
      releaseDate: "2015"
    }

    Game.create(body).then(success => {
    }).catch(err => {
      console.log(err);
    })
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
  });

  afterEach(() => {
    return Game.remove()
    //   // clear collection.
  });

  it('runs the tests', () => {});

  // test the POST here

  it("Should post a user and return it", async() => {
    const game = {
      title: "Halo 5",
      genre: "FPS",
      releaseDate: "2015"
    };
    // body = JSON.stringify(body)
    // server.use(express.json())
    const response = await request(server).post('/api/games').send(game)
    expect(response.status).toEqual(201);
    expect(response.body.title).toEqual("Halo 5")
  })

  // test the GET here
  it('Should return OK and json object from index route and have 2 game', async() => {
    const response = await request(server).get('/api/games');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toHaveLength(1)
    // console.log(response.body)
})

  // Test the DELETE here
  it("Should delete a user", async() => {
    const response = await request(server).get('/api/games');
    gameId = response.body[0]._id;
    const responseDel = await request(server).delete(`/api/games/${gameId}`);
    expect(responseDel.body).toEqual({});
    expect(responseDel.status).toEqual(204);
});

  //Test the PUT here
  it("Should update a user", async() => {
    const response = await request(server).get('/api/games');
    gameId = response.body[0]._id;
    // console.log(gameId)
    const responsePut = await request(server).put(`/api/games/${gameId}`).send({title: "SKYRIM", id: 2});
    expect(responsePut.body.title).toEqual("SKYRIM");
    expect(response.status).toEqual(200)
});
});
