const request = require('supertest');
const server = require('./server.js');

// always use async/await when doing server tests
describe('server.js', () => {
  it('should return status code 200 OK', async () => {
    const expected = 200;
    const response = await request(server).get('/');
    expect(response.status).toEqual(expected);
  });

  it('should return status code 404 if not hitting a resource', async () => {
    const expected = 404;
    const URL = '/badPAge';
    const response = await request(server).get(URL);
    expect(response.status).toEqual(expected);
  });

  it('should return URL attempted if a 404', async () => {
    const expected = 404;
    const URL = '/badPAge';
    const response = await request(server).get(URL);
    expect(response.error.text).toContain(URL);
  });

  it('should return JSON', async () => {
    const response = await request(server).get('/');
    expect(response.type).toEqual('application/json');
  });
});

describe('post games', () => {
  it('should return a 200 when adding a game', async () => {
    const expected = 200;
    const game = { title: 'Pacman', genre: 'Arcade', releaseYear: 1980 };
    const response = await request(server)
      .post('/games')
      .send({ game });
    expect(response.status).toEqual(expected);
  });

  it('should add a game', async () => {
    const game = { title: 'Ms. Pacman', genre: 'Arcade', releaseYear: 1982 };
    const response = await request(server)
      .post('/games')
      .send({ game });
    const valid = Array.isArray(response.body.games);
    expect(valid).toBe(true);
  });

  it('should return a 422 if missing the game object', async () => {
    const expected = 422;
    const response = await request(server)
      .post('/games')
      .send({});
    expect(response.status).toEqual(expected);
  });

  it('should return a 422 if missing the title of a game', async () => {
    const expected = 422;
    const game = { title: '', genre: 'Arcade', releaseYear: 1980 };
    const response = await request(server)
      .post('/games')
      .send({ game });
    expect(response.status).toEqual(expected);
  });

  it('should return a 422 if missing the genre of a game', async () => {
    const expected = 422;
    const game = { title: 'Pacman', genre: '', releaseYear: 1980 };
    const response = await request(server)
      .post('/games')
      .send({ game });
    expect(response.status).toEqual(expected);
  });

  it('should return a 405 if adding a duplicate game title', async () => {
    const expected = 405;
    const game = { title: 'Pacman', genre: 'Arcade', releaseYear: 1980 };
    const response = await request(server)
      .post('/games')
      .send({ game });
    expect(response.status).toEqual(expected);
  });
});

describe('get games', () => {
  it('should return status code 200 when hit `/games`', async () => {
    const expected = 200;
    const response = await request(server).get('/games');
    expect(response.status).toEqual(expected);
  });

  it('should return an array of games', async () => {
    const response = await request(server).get('/games');
    const valid = Array.isArray(response.body.games);
    expect(valid).toBe(true);
  });
});

describe('get game by id', () => {
  it('should return status code 200 when hit `/games/:id` and id exists', async () => {
    const expected = 200;
    const response = await request(server).get('/games/1');
    expect(response.status).toEqual(expected);
  });

  it("should return status code 404 when hit `/games/:id` and there's no game with that id", async () => {
    const expected = 404;
    const response = await request(server).get('/games/10');
    expect(response.status).toEqual(expected);
  });
});

describe('delete game by id', () => {
  it('should return status code 200 when hit `/games/:id` and id exists', async () => {
    const expected = 200;
    const response = await request(server).delete('/games/1');
    expect(response.status).toEqual(expected);
  });

  it('should return an array of the remaining games after deleting', async () => {
    const response = await request(server).delete('/games/2');
    const valid = Array.isArray(response.body.games);
    expect(valid).toBe(true);
  });

  it("should return status code 404 when hit `/games/:id` and there's no game with that id", async () => {
    const expected = 404;
    const response = await request(server).delete('/games/10');
    expect(response.status).toEqual(expected);
  });
});
