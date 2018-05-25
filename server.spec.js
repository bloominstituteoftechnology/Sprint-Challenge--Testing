const mongoose = require('mongoose');
const request = require('supertest');

const Game = require('./games/Game');
const server = require('./server.js');

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

  beforeEach((done) => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    const newGame = new Game({
      title: 'CSGO',
      genre:'FPS',
    }).save((err, store) => {
      if (err) {
        console.log('there was an error with the save in the before each');
        done();
      }
      else {
        gameId = store.id;
        done();
      }
    })
  });

  afterEach((done) => {
    //   // clear collection.
    Game.remove({}, err => {
      if(err) {console.log('error with the after each');}
      done();
    })
  });

  it('runs the tests', () => {});

  // test the POST here
  test('post', async (done) => {
    const newGame = {
      title: 'wow',
      genre:'mmo',
    };
    const basic = await Game.create(newGame);
    const test = await request(server)
    .post('/api/games')
    .send(newGame)
    expect(basic.title).toEqual('wow');
    expect(test.status).toBe(201);
    done();
  });
  test('post error', async (done) => {
    const error = await request(server).post('/api/games').send(null);
    expect(error.status).toBe(500);
    done();
  });

  // test the GET here
  test('should receive a list of games stored in the db', async (done) => {
    const response = await request(server).get('/api/games');
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    done();
  });
  test('get method returns an array', async (done) => {
    const response = await request(server).get('/api/games');
    expect(response.body).not.toBe('string');
    expect(Array.isArray(response.body)).toBe(true);
    done();
  })

  // Test the DELETE here
  test('should delete an item', async (done) => {
    const badGame = {
      title: 'wow',
      genre:'mmo',
    }
    const newGame = await Game.create(badGame);
   request(server).delete(`api/games/${newGame.id}`)
   expect(204);
   done();
  });
  test('delete error', async (done) => {
    request(server)
    .delete('/api/games/1111')
    expect(500);
    done();
  })
});
