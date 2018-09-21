const request = require('supertest');
const app = require('./app.js');

describe('A chill Node API', ()=>{

  it('puts the lotion on its skin, or else it gets the hose again', async ()=>{
    const response = await request(app).get('/');
    expect(response.status).toEqual(200);
  })

  it('POST returns 422 with incomplete data', async () => {
    let data = {
      title: 'Minecraft',
      releaseYear: 2014
    };
    const response =
      await request(app)
        .post('/games')
        .send(data)
        .set('Accept', 'application/json');
  })

  it('POST returns status 201', async () => {
    let data = {
      title: 'Pacman', // required
      genre: 'Arcade', // required
      releaseYear: 1980 // not required
    };
    const response =
      await request(app)
        .post('/games')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);
  });

  it('POST returns data title', async () => {
    let data = {
      title: 'Doom', 
      genre: '1st-person shooter', 
      releaseYear: 1982 
    };
    const response =
      await request(app)
        .post('/games')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);

    expect(response.body[1].title).toBe('Doom');
  })

  it('Checking GET with games', async () => {
    const response = await request(app).get('/games');
    expect(response.status).toEqual(200);
  });

  it('Checking GET with games', async () => {
    const response = await request(app).get('/games');
    expect(response.body[0].genre).toEqual('Arcade');
  });
})
