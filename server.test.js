const dbModel = require('./dbmodel');
const db = require('./dbinit');
const server = require('./server');
const request = require('supertest');

describe('GET test', () => {
  test('should return a status code of 200', async () => {
    const response = await request(server).get('/games');
    expect(response.status).toBe(200);
  });

  test('should return a status message of OK', async () => {
    const response = await request(server).get('/games');
    expect(response.res.statusMessage).toBe('OK');
  });

  test('should return a type of application/json', async () => {
    const response = await request(server).get('/games');
    expect(response.type).toBe('application/json');
  });
});

describe('POST test', () => {
  afterEach(async () => {
    await db('games').truncate();
  });

  const game = {
    title: 'Red Dead Redemption',
    genre: 'Adventure',
    releaseYear: '2018'
  };

  test('should be inserting successfully with a status code of 201', async () => {
    const response = await request(server)
      .post('/games')
      .send(game);
    expect(response.status).toBe(201);
  });

  test('should be inserting json', async () => {
    const response = await request(server)
      .post('/games')
      .send(game);
    expect(response.type).toBe('application/json');
  });

  test('should be having a status message of Created', async () => {
    const response = await request(server)
      .post('/games')
      .send(game);
    expect(response.res.statusMessage).toBe('Created');
  });
});

describe('DELETE request', () => {
  let id;

  const game = {
    title: 'Red Dead Redemption',
    genre: 'Adventure',
    releaseYear: '2018'
  };
  beforeEach(async () => {
    const response = await request(server)
      .post('/games')
      .send(game);
    response.body.map(item => {
      return (id = item);
    });
  });

  test('Should be having a status code of 200', async () => {
    const response = await request(server).del(`/games/${id}`);
    expect(response.status).toBe(200);
  });

  test('Should be sending a json object', async () => {
    const response = await request(server).del(`/games/${id}`);
    expect(response.type).toBe('application/json');
  });

  test('Should be having a status message of OK', async () => {
    const response = await request(server).del(`/games/${id}`);
    expect(response.res.statusMessage).toBe('OK');
  });
});
