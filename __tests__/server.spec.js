const request = require('supertest');
const server = require('../index');

describe('SERVER', () => {
    describe('Index Route', () => {
        describe('get', () => {
            it('should return OK status code', async () => {
                const res = await request(server).get('/');
                expect(res.status).toEqual(200);
            });

            it('should return response body, array', async () => {
                const expected = {
                    success: true,
                    data: {
                        results: [
                            {
                                title: 'Arkanoid',
                                genre: 'breakout',
                                releaseYear: 1986
                            },
                            {
                                title: 'Asteroids',
                                genre: 'multi-directional shooter',
                                releaseYear: 1979
                            },
                            {
                                title: 'Defender',
                                genre: 'scrolling shooter',
                                releaseYear: 1981
                            },
                            {
                                'title': 'Rush\'n\'Attack',
                                'year': 1985,
                                'genre': 'run and gun',
                              },
                              {
                                'title': 'Sinistar',
                                'year': 1982,
                                'genre': 'scrolling shooter',
                              },
                              {
                                'title': 'Skate or Die!',
                                'year': 1988,
                                'genre': 'skateboarding',
                              }
                        ]
                    }
                };

                const res = await request(server).get('/');
                expect(res.body).toEqual(expected);
            });

            it('should return response type, JSON', async () => {
                const res = await request(server).get('/');
                expect(res.type).toEqual('application/json');
            });
        });

        describe('post', () => {
            it('should return OK status code', async () => {
                const res = await request(server).post('/');
                expect(res.status).toEqual(200);
            });
        });
    });
});
