const mongoose = require('mongoose');
const request = require('supertest');
const server = require('./api/server');

describe('The API Server', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/games')
      .then(() => console.log('\n=== connected to games DB ==='))
      .catch(err => {
        console.log('error connecting to games database, is MongoDB running?');
      });
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from games DB ==='));
  });

  let gameOneId;
  let gameTwoId;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
  });

  afterEach(() => {
    //   // clear the games collection.
  });

  it('It should return a status code of 201 and return the title, genre, and release date of the game created.', async () => {

    // Test the POST here

    const expectedStatusCode = 201;

    const fortnite = { title: 'Fortnite', genre: 'Survival', releaseDate: 'July 25, 2017' };
    const responseOne = await request(server).post('/api/games').send(fortnite);

    const godofwar = { title: 'God of War 4', genre: 'Action-adventure', releaseDate: 'April 20, 2018' };
    const responseTwo = await request(server).post('/api/games').send(godofwar);

    expect(responseOne.status).toEqual(expectedStatusCode);
    expect(responseOne.body.title).toEqual(fortnite.title);
    expect(responseOne.body.genre).toEqual(fortnite.genre)
    expect(responseOne.body.releaseDate).toEqual(fortnite.releaseDate)
    expect(responseOne.type).toEqual('application/json');

    gameOneId = responseOne.body._id;

    expect(responseTwo.status).toEqual(expectedStatusCode);
    expect(responseTwo.body.title).toEqual(godofwar.title);
    expect(responseTwo.body.genre).toEqual(godofwar.genre);
    expect(responseTwo.body.releaseDate).toEqual(godofwar.releaseDate);
    expect(responseTwo.type).toEqual('application/json');

    gameTwoId = responseTwo.body._id;
  });

  it('It should return a list of games.', async () => {

    // Test the GET here

    const expectedStatusCode = 200;
    const response = await request(server).get('/api/games');

    expect(response.status).toEqual(expectedStatusCode);
    expect(response.body.length).toBeGreaterThanOrEqual(2);
  });

  it('It should correctly update the two games created during testing.', async () => {

    // Test the PUT here 

    const expectedStatusCode = 200;

    const expectedUpdateOne = { title: 'forty' };
    const responseOne = await request(server).put(`/api/games/${gameOneId}`).send(expectedUpdateOne);

    expect(responseOne.status).toEqual(expectedStatusCode);
    expect(responseOne.body.title).toEqual(expectedUpdateOne.title);

    const expectedUpdateTwo = { title: 'God of Peace' };
    const responseTwo = await request(server).put(`/api/games/${gameTwoId}`).send(expectedUpdateTwo);

    expect(responseTwo.status).toEqual(expectedStatusCode);
    expect(responseTwo.body.title).toEqual(expectedUpdateTwo.title);
  });

  it('It should delete the two games created during testing.', async () => {

    // Test the DELETE here

    const expectedStatusCode = 204;

    const responseOne = await request(server).delete(`/api/games/${gameOneId}`);
    expect(responseOne.status).toEqual(expectedStatusCode);

    const responseTwo = await request(server).delete(`/api/games/${gameTwoId}`);
    expect(responseTwo.status).toEqual(expectedStatusCode);
  });
});
