const request = require('supertest');
const server = require('./server');

describe('server.js routes', () => {
  it('should return status OK and JSON {api: "Running"} from index route', async () => {
    await request(server).get('/').expect('Content-Type', /json/).expect(200, {
      api: 'Running'
    });
  });

  it('should return a list of games from the GET /games route', async () => {
    //await request(server).get('/games').expect('Content-Type', /json/);
    const response = await request(server).get('/games');
    //Test the content type of the response
    expect(response.type).toEqual('application/json');
    //Test that the response is an array
    expect(typeof response).toEqual('object');
  })

  it('should add a game to the games array via POST /games route', async () => {
    await request(server)
            .post('/games')
            .expect('Content-Type', /json/)
            .send({
              title: 'Super Mario Bros',
              genre: 'Sidescroller',
              releaseYear: 1972
            })
            .set('Accept', 'application/json')
            .expect(201)
            .expect({success: true});
  })

  it('should return an error with code 422 when /games POST is malformed', async() => {
    await request(server)
            .post('/games')
            .expect('Content-Type', /text/)
            .send({
              title: 'Mass Effect 7'
            })
            .set('Accept', 'application/json')
            .expect(422)
  })
});
