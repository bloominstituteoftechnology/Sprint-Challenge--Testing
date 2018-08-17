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
    console.log('BODY', response.body);
    expect(response.error.text).toContain(URL);
  });

  it('should return JSON', async () => {
    const response = await request(server).get('/');
    expect(response.type).toEqual('application/json');
  });

  describe('list games', () => {
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
  }

  describe('post games', () => {
    it('should add a game', async () => {
      const game = {title: 'Pacman', genre:'Arcade', releaseYear: 1980}
      const response = await request(server)
        .post('/games')
        .send({ game: game });
      const valid = Array.isArray(response.body.games);
      expect(valid).toBe(true);
    });

    it('should return a 422 if missing the title of a game', async () => {
      const expected = 422;
      const game = {title: '', genre:'Arcade', releaseYear: 1980}
      const response = await request(server)
        .post('/games')
        .send({ game: game });
        expect(response.status).toEqual(expected);
    });

    it('should return a 422 if missing the genrew of a game', async () => {
      const expected = 422;
      const game = {title: 'Pacman', genre:'', releaseYear: 1980}
      const response = await request(server)
        .post('/games')
        .send({ game: game });
        expect(response.status).toEqual(expected);
    });

    it('should delete a game', async () => {
      const game = 'The Lord f the Flies';
      const response = await request(server)
        .delete('/games')
        .send({ game: game });
      const gameArr = response.body.games;
      let valid = true;
      for (let i = 0; i < gameArr.length; i++) {
        if (gameArr[i] == game) valid = false;
      }
      expect(valid).toBe(true);
    });
  });
});
