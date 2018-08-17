const request = require('supertest');
const server = require('./server');
const db = require('knex')(require('./knexfile').development);


const errNum = 422;
const missingTitle = {
  genre: 'Arcade',
};
const missingGenre = {
  title: 'Pacman',
};
const newGame = {
  title: 'Pacman',
  genre: 'Arcade',
  releaseYear: 1994,
};

describe('Games server', () => {
  beforeAll((done) => {
    db
      .truncate('games')
      .then(res => db.truncate('genres'))
      .then(res => {
        done();
      });
  });
  it('get request returns an empty array when empty', async () => {
    const response = await request(server).get('/games');
    expect(response.status).toEqual(200);
    expect(response.body instanceof Array).toBe(true);
    expect(response.body.length).toEqual(0);
  });
  describe('post request', () => {
    it('returns a 422 error when attempting to create a post lacking title', async () => {
      const response = await request(server)
        .post('/games')
        .send(missingTitle);
      expect(response.status).toEqual(errNum);
      expect(response.body).toEqual({
        message: 'Post must include title and be at least 1 character',
      });
    });

    it('returns a 422 error when attempting to create a post lacking genre', async () => {
      const response = await request(server)
        .post('/games')
        .send(missingGenre);
      expect(response.status).toEqual(errNum);
      expect(response.body).toEqual({ message: 'Post must include genre' });
    });

    it('returns status code 201 when a complete game is posted', async () => {
      const response = await request(server)
        .post('/games')
        .send(newGame);
      expect(response.status).toEqual(201);
    });
  });
  it('get request returns an array containing games when they are in store', async () => {
    response = await request(server).get('/games');
    const { status, body } = response;
    expect(status).toEqual(200);
    expect(body instanceof Array).toEqual(true);
    expect(body[body.length - 1]).toEqual(newGame);
  });
});
