const request = require('supertest');
const server = require('./index');
describe('server', () => {
  describe('GET /games', () => {
    it('should return a 200 status code', async () => {
      const res = await request(server).get('/games');
      expect(res.status).toEqual(200);
    });
    it('returned response should be type JSON', async () => {
      const res = await request(server).get('/games');
      expect(res.type).toEqual('application/json');
    });
    it('should return an array of games in response body', async () => {
      const expected = [
        {
          id: '1',
          title: 'Pacman', // required
          genre: 'Arcade', // required
          releaseYear: 1980 // not required
        },
        {
          id: '2',
          title: 'DragonAge', // required
          genre: 'RPG', // required
          releaseYear: 2009 // not required
        },
        {
          id: '3',
          title: 'Halo', // required
          genre: 'First Person Shooter', // required
          releaseYear: 2003 // not required
        }
      ];
      const res = await request(server).get('/games');
      expect(res.body).toEqual(expected);
    });
  });
  describe('GET /games/:id', () => {
    it('should return a status code of 200', async () => {
      const res = await request(server).get('/games/2');
      expect(res.status).toEqual(200);
    });
    it('should respond with a type of JSON', async () => {
      const res = await request(server).get('/games/2');
      expect(res.type).toEqual('application/json');
    });
    it('should return with a single object', async () => {
      const expected = {
        id: '2',
        title: 'DragonAge', // required
        genre: 'RPG', // required
        releaseYear: 2009 // not required
      };
      const res = await request(server).get('/games/2');
      expect(res.body).toEqual(expected);
    });
    it('should return with a 404 status if the game is not found', async () => {
      const res = await request(server)
        .get('/games/10')
        .expect(404);
    });
  });
  describe('POST /games', () => {
    it('should return successfully with a status code of 201', async () => {
      const game = {
        title: 'Monster Hunter', // required
        genre: 'MMORPG', // required
        releaseYear: 2018 // not required
      };
      const res = await request(server)
        .post('/games')
        .send(game)
        .expect(201);
    });
    it('should return with an id', async () => {
      const game = {
        title: 'Knights of the Old Republic', // required
        genre: 'RPG', // required
        releaseYear: 2005 // not required
      };
      const res = await request(server)
        .post('/games')
        .send(game);
      expect(res.body[3].id).toEqual(4);
    });
    it('should return unsuccessfully with a status code of 422', async () => {
      const game = {
        title: 'Monster Hunter' // required
      };
      const res = await request(server)
        .post('/games')
        .send(game);
      expect(res.status).toEqual(422);
    });
    it('should return an array of games with the newly posted object', async () => {
      const game = {
        title: 'Game Title', // required
        genre: 'Game Genre', // required
        releaseYear: 2018 // not required
      };
      const expected = {
        id: 6,
        title: 'Game Title', // required
        genre: 'Game Genre', // required
        releaseYear: 2018 // not required
      };

      const res = await request(server)
        .post('/games')
        .send(game);
      expect(res.body[res.body.length - 1]).toEqual(expected);
    });
  });
});
