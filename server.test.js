describe('server.js', () => {
  describe('GET /games', () => {
    it('should return a status code of 200', () => {
      const response = request(server).get('/games');
      expect(response.status).toBe(200);
    });
    it('should always return an array', async () => {
      const response = request(server).get('/games');
      expect(Array.isArray (response.body)).toBe('array');
    });
    it('should return a list of games', async () => {
      const response = request(server).get('/games');
      const expected = [
        { id: 1, title: 'Fortnite', genre: 'Battle Royale', releaseYear: 2017 },
        { id: 2, title: 'Fifa 19', genre: 'Sports', releaseYear: 2018 }
      ];
      expect(response.body).toEqual(expected);
    });
  });
  describe('POST /games', () => {
    it('should return a status code of 422 if not enough information', async () => {
      const response = await request(server)
        .post('/games')
        .send({
          title: 'abc'
        });
      expect(response.status).toBe(422);
    });
    it('should return games if succesfully added', async () => {
      const response = await request(server)
        .post('/games')
        .send({
          title: 'NBA 2K19',
          genre: 'Sports',
          releaseYear: 2018
        });
      const expected = [
        { id: 1, title: 'Fortnite', genre: 'Battle Royale', releaseYear: 2017 },
        { id: 2, title: 'Fifa 19', genre: 'Sports', releaseYear: 2018 },
        { id: 3, title: 'NBA 2K19', genre: 'Sports', releaseYear: 2018 }
      ];
      expect(response.body).toEqual(expected);
    });
    it('should return a status code of 201 if successful', async () => {
      const response = await request(server)
        .post('/games')
        .send({
          title: 'Delete',
          genre: 'Deleted'
        });
      expect(response.status).toBe(201);
    });
  });
});