const request = require('supertest');

const server = require('../api/server.js');

describe('server.js', () => {

  describe('/ route', () => {
    it('should return status code 200', async () => {
      let response = await request(server).get('/')
      expect(response.status).toBe(200);
    })

    it('should return application/json', async () => {
      let response = await request(server).get('/')
      // RED TEST: expect(response.type).toBe('application/xml');
      expect(response.type).toBe('application/json');
    })

    it('should return a JSON object from the index route', async () => {
      const expectedBody = { api: 'Ready!' };
        // RED TEST: const expectedBody = { api: 'up' };
      const response = await request(server).get('/');
      expect(response.body).toEqual(expectedBody);
    })
  })

  describe('POST /games endpoint', () => {
    it('should add title, genre, and releaseYear', async () => {
      let response = await request(server)
        .post('/games')
        .send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 })

      expect(response.body).toEqual({ added: 'Arcade: Pacman (1980)'})

      response = await request(server)
      .post('/games')
      .send({ title: 'Pole Position', genre: 'Arcade' })

      expect(response.body).toEqual({ added: 'Arcade: Pole Position (undefined)'})

      response = await request(server)
      .post('/games')
      .send({ title: 'Pharaoh', genre: 'Strategy/Simulation', releaseYear: 1999 })
      // RED TEST: .send({ title: 'Pharaoh', releaseYear: 1999 }) // received 422 error from middleware

      expect(response.body).toEqual({ added: 'Strategy/Simulation: Pharaoh (1999)'})
    })
  })

  describe('GET /games endpoint', () => {
    it('should return status code 200', async () => {
      let response = await request(server)
        .get('/games')

        expect(response.status).toBe(201);
        // RED TEST: received 404
    })

    it('should return application/json', async () => {
      let response = await request(server).get('/games')
      // expect(response.type).toBe('application/xml');
      expect(response.type).toBe('application/json');
    })

    it('should return a JSON object from /games', async () => {
      const expectedBody = [{"genre": "Drama|Romance", "releaseYear": 1992, "title": "Quo Lux"}, {"genre": "Comedy", "releaseYear": 1986, "title": "Fintone"}, {"genre": "Drama", "releaseYear": 1997, "title": "Bitwolf"}, {"genre": "Drama", "releaseYear": 1984, "title": "Subin"}, {"genre": "Comedy|Crime", "releaseYear": 2002, "title": "Andalax"}, {"genre": "Crime|Horror|Mystery", "releaseYear": 2016, "title": "Latlux"}, {"genre": "Drama", "releaseYear": 1999, "title": "Fix San"}, {"genre": "Drama|Romance", "releaseYear": 1985, "title": "Stim"},{"genre": "Crime|Drama", "releaseYear": 2010, "title": "Rank"}, {"genre": "Action|Comedy|Sci-Fi", "releaseYear": 1995, "title": "Ventosanzap"}, {"genre": "Drama", "releaseYear": 1998, "title": "Temp"}, {"genre": "Adventure|Children|Fantasy", "releaseYear": 1989, "title": "Gembucket"}, {"genre": "Comedy|Drama", "releaseYear": 2005, "title": "Stronghold"}, {"genre": "Comedy|Romance", "releaseYear": 1982, "title": "Tin"}, {"genre": "Crime|Mystery", "releaseYear": 1984, "title": "Treeflex"}, {"genre": "Comedy", "releaseYear":1999, "title": "Kanlam"}, {"genre": "Drama", "releaseYear": 1983, "title": "Andalax"}, {"genre": "Comedy|Drama|Thriller", "releaseYear": 1988, "title": "Quo Lux"}, {"genre": "Adventure|Animation|Children|Comedy|Fantasy|Romance", "releaseYear": 1992, "title": "Duobam"}, {"genre": "Comedy", "releaseYear": 2010, "title": "Home Ing"}, {"genre": "Action|War", "releaseYear": 1986, "title": "Voyatouch"}, {"genre": "Comedy", "releaseYear": 1988, "title": "Wrapsafe"}, {"genre": "Adventure|Drama|Romance", "releaseYear": 1989, "title": "Aerified"}, {"genre": "Comedy", "releaseYear": 2012, "title": "Pannier"}, {"genre": "Documentary", "releaseYear": 2001, "title": "Duobam"}, {"genre": "Adventure|Romance", "releaseYear": 1982, "title": "Pannier"}, {"genre": "Drama", "releaseYear": 2013, "title": "Redhold"}, {"genre": "Crime|Drama|Thriller", "releaseYear": 2018, "title": "Flexidy"}, {"genre": "Adventure", "releaseYear": 1985, "title": "Flowdesk"}, {"genre": "Drama", "releaseYear": 1985, "title": "Redhold"}, {"genre": "Drama", "releaseYear": 1995, "title": "Regrant"}, {"genre": "Documentary|IMAX", "releaseYear": 1998, "title": "Flexidy"}, {"genre": "Drama", "releaseYear": 2001, "title": "Vagram"}, {"genre": "Drama|Horror|Thriller", "releaseYear": 1997, "title": "Asoka"}, {"genre": "Fantasy|Horror|Romance|Thriller", "releaseYear": 1985, "title": "Kanlam"}, {"genre": "Comedy|Romance", "releaseYear": 1997, "title": "Sonsing"}, {"genre": "Documentary|IMAX", "releaseYear": 1990, "title": "Voyatouch"}, {"genre": "Adventure|Documentary", "releaseYear": null, "title": "Zathin"}, {"genre": "Comedy|Drama|Romance", "releaseYear": 1989, "title": "It"}, {"genre": "Crime|Drama|Mystery", "releaseYear": 1989, "title": "Biodex"}, {"genre": "Drama|Sci-Fi|Thriller", "releaseYear": 2015, "title": "Namfix"}, {"genre": "Action|Comedy|Crime|Thriller", "releaseYear": null, "title": "Stronghold"}, {"genre": "Action|Comedy", "releaseYear": 1997, "title": "Bytecard"}, {"genre": "Action|Crime|Film-Noir|Mystery|Thriller", "releaseYear": 2014, "title": "Duobam"}, {"genre": "Drama", "releaseYear": 2004, "title": "Cardify"}, {"genre": "Comedy", "releaseYear": 1989, "title": "Tempsoft"}, {"genre": "Action|Drama", "releaseYear": 1991, "title": "Bamity"}, {"genre": "Comedy|Drama|Romance|War", "releaseYear": 2011, "title": "It"}, {"genre": "Mystery|Romance|Sci-Fi", "releaseYear": 1987, "title": "Zathin"}, {"genre": "Comedy|Drama|Romance", "releaseYear": null, "title": "Tampflex"}, {"genre": "Drama", "releaseYear": 1986, "title": "Konklux"}, {"genre": "Comedy|Romance", "releaseYear": 2004, "title": "Solarbreeze"}, {"genre": "Comedy|Drama", "releaseYear": 1991, "title": "Zoolab"}, {"genre": "Comedy|Drama|Romance", "releaseYear": 1998, "title": "Regrant"}, {"genre": "Drama|Horror", "releaseYear": 2013, "title": "Redhold"}, {"genre": "Drama", "releaseYear": 1989, "title": "Bamity"}, {"genre": "Action|Adventure|Fantasy|Sci-Fi", "releaseYear": null, "title": "Y-find"}, {"genre": "Documentary|Musical", "releaseYear": 2009, "title": "Temp"}, {"genre": "Comedy|Romance", "releaseYear": 2005, "title": "Fintone"}, {"genre": "Drama|Romance", "releaseYear": 1987, "title": "Lotlux"}, {"genre": "Adventure|Children|Fantasy", "releaseYear": 1987, "title": "Tres-Zap"}, {"genre": "Animation|Children", "releaseYear": 2016, "title": "It"}, {"genre": "Drama", "releaseYear": 1984, "title": "Latlux"}, {"genre": "Horror|Sci-Fi", "releaseYear": 2005, "title": "Stim"}, {"genre": "Drama", "releaseYear": 1986, "title": "Fixflex"}, {"genre": "Documentary", "releaseYear": 2008, "title": "Home Ing"}, {"genre": "Comedy|Drama|Romance", "releaseYear": 1995, "title": "Zaam-Dox"}, {"genre": "Comedy", "releaseYear":1987, "title": "Cookley"}, {"genre": "Drama", "releaseYear": 2016, "title": "Y-Solowarm"}, {"genre": "Crime|Drama|Mystery", "releaseYear": 2000, "title": "Pannier"}, {"genre": "Drama|Sci-Fi", "releaseYear": 2012, "title": "Span"}, {"genre": "Comedy|Western", "releaseYear": 2013, "title": "Cardguard"}, {"genre": "Comedy|Romance", "releaseYear": 2010, "title": "Bigtax"}, {"genre": "Comedy|Drama", "releaseYear": 1983, "title": "Cardify"}, {"genre": "Adventure", "releaseYear": 1998, "title": "Quo Lux"}, {"genre": "Drama", "releaseYear": 2002, "title": "Redhold"}, {"genre": "Drama|Mystery", "releaseYear": 2011, "title": "Bigtax"}, {"genre": "Comedy|Documentary", "releaseYear": 2002, "title": "Tresom"}, {"genre": "Comedy|Drama|Romance", "releaseYear": 2011, "title": "Greenlam"}, {"genre": "Animation|Musical|Romance", "releaseYear": 2004, "title": "Alpha"}, {"genre": "Action|Adventure|Animation|Sci-Fi", "releaseYear": 1996, "title": "Hatity"}, {"genre": "Romance|Western", "releaseYear": 1998, "title": "Zoolab"}, {"genre": "Comedy|Romance", "releaseYear": 1999, "title": "Overhold"}, {"genre": "Comedy", "releaseYear": 1982, "title": "Cookley"}, {"genre": "Animation", "releaseYear": 2005, "title": "Zathin"}, {"genre": "Action|Adventure|Fantasy|Sci-Fi", "releaseYear": 1988, "title": "Latlux"}, {"genre": "Action|Comedy", "releaseYear": 2002, "title": "Kanlam"}, {"genre": "Comedy", "releaseYear": 1988, "title": "Y-find"}, {"genre": "Thriller", "releaseYear": 2000, "title": "Alpha"}, {"genre": "Thriller", "releaseYear": 2015, "title": "Stronghold"}, {"genre": "Drama|Fantasy", "releaseYear": 2014, "title": "Namfix"}, {"genre": "Adventure|Comedy|War", "releaseYear": null, "title": "Bytecard"}, {"genre": "Drama|Romance", "releaseYear": null, "title": "Greenlam"}, {"genre": "Documentary", "releaseYear": null, "title": "Ronstring"}, {"genre": "Drama", "releaseYear": 1992, "title": "Voltsillam"}, {"genre": "Comedy|Romance", "releaseYear": 1998, "title": "Temp"}, {"genre": "Romance", "releaseYear": null, "title": "Solarbreeze"}, {"genre": "Documentary", "releaseYear": 1988, "title": "Bitwolf"}, {"genre": "Comedy", "releaseYear": 2015, "title": "Mat Lam Tam"}, {"genre": "Comedy|Crime", "releaseYear": 2000, "title": "Hatity"}];
      // const expectedBody = { message: "you can't play today" };
      const response = await request(server).get('/games');
      // expect(response.body).toEqual(expectedBody);
    })
  })

// all title, genre, and releaseYear for all games
  // - write tests to verify that the endpoint returns the correct HTTP status code when receiving correct and incorrect game data.
})