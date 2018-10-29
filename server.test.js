describe('server.js', () => {
  describe('GET /games', () => {
    it('should return a status code of 200', () => {
      const response = request(server).get('/games');
      expect(response.status).toBe(200);
    });
    it('should always return an array', async () => {
      const response = request(server).get('/games');
      expect(typeof response.body).toBe('array');
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
});