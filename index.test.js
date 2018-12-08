const request = require('supertest');

const server = require('./api/server');

describe('Testing Sprint / Games DB',() => {
  describe('/games GET', () => {
    it('should return status 200', async () => {
      let response = await request(server).get('/games');
      expect(response.status).toBe(200);
    });
    it('should ', async () => {
      let response = await request(server).get('/games');

      expect(response.type).toBe('application/json');
    });
    it('should return empty if no games', () => {
    });
  }); 
  describe('/games POST', () => {
    it('should return status 201', async () => {
      let response = await request(server).post('/games');
      expect(201);
    });
    it('should add game', async () => {
      const response = await request(server)
        .post('/games')
        .send({
          title: 'Metal Slugg',
          genre: 'Action',
          releaseYear: 1984,
        });
      expect(response.body).toEqual([4]);
    });
    it('responds with error 422 if no title is given', async() => {
      const response = await request(server)
        .post('/games')
        .send({
          title: '',
          genre: 'Action',
          releaseYear: 1984,
        });
      expect(response.body).toEqual([4]);
    });
  });
  describe("DELETE", () => {
    it("Should be able to run tests", async () => {
      const response = await request(server).delete("/games/:id");
      expect(response).toBeTruthy();
    });
    it("Should return 200 if game with that id exists", async () => {
      const response = await request(server)
        .delete("/games/:id")
        .send({ id: 2 });
      expect(response.status).toBe(200);
    });
    it("Should return 404 if no game exists with that id", async () => {
      const response = await request(server)
        .delete("/games/:id")
        .send({ id: 100 });
      expect(response.status).toBe(404);
    });
  });
});