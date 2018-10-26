const request = require('supertest');

const server = require('./api/apiRoutes');

const knex = require('knex');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

describe('server', () => {
    describe('initial tests', () => {
        it('should return true', () => {
            expect(true).toBeTruthy();
        });
        it('should return false', () => {
            expect(false).toBeFalsy();
        });
    });

    describe('route handlers', () => {
        beforeAll(function(done) {
            db.migrate.latest()
            .then(function() {
                return db.seed.run()
                .then(function() {
                    done();
                });
            });
        });

        beforeEach(function(done) {
            db.migrate.rollback()
            .then(function() {
                db.migrate.latest()
                .then(function() {
                    return db.seed.run()
                    .then(function() {
                        done();
                    });
                });
            });
        });

        afterEach(function(done) {
            db.migrate.rollback()
            .then(function() {
                done();
            });
        });

        afterAll(function(done) {
            db.migrate.latest()
            .then(function() {
                return db.seed.run()
                .then(function() {
                    done();
                });
            });
        });

        describe('GET /api', () => {
            it('should return 200 OK', async () => {
                const response = await request(server).get('/api');
    
                expect(response.status).toBe(200);
            });
            it('should return JSON', async () => {
                const response = await request(server).get('/api');

                expect(response.type).toBe('application/json');
            });
            it('should return { message: "server is up" }', async () => {
                const response = await request(server).get('/api');

                expect(response.body).toEqual({ message: 'server is up' });
            });
        });

        describe('GET /api/games', () => {
            it('should return games', (done) => {
                request(server)
                .get('/api/games')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
            });
            it('should not return text/html', async () => {
                const response = await request(server).get('/api/games');

                expect(response.type).not.toBe('text/html');
            });
            it('should return an array', async () => {
                const response = await request(server).get('/api/games');

                expect(response.body).toBeInstanceOf(Array);
            });
        });

        describe('GET /api/games/:id', () => {
            it('should return a game', (done) => {
                request(server)
                .get('/api/games/1')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
            });
            it('should return not found', (done) => {
                request(server)
                .get('/api/games/59')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(404)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
            });
            it('should have three properties', async () => {
                const response = await request(server).get('/api/games/2');

                expect(response.body).toEqual(expect.objectContaining({ title: expect.any(String), genre: expect.any(String), releaseYear: expect.any(String) }));
            });
        });

        describe('POST /api/games', () => {
            it('should add a game', (done) => {
                request(server)
                .post('/api/games')
                .send({ "title": "Grand Theft Auto: Vice City", "genre": "Action-Adventure", "releaseYear": 2002 })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
            });
            it('should have unique name', (done) => {
                request(server)
                .post('/api/games')
                .send({ "title": "Fallout 2", "genre": "RPG", "releaseYear": 1998 })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(405)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
            });
            it('should have all required fields', (done) => {
                request(server)
                .post('/api/games')
                .send({ "title": "The Elder Scrolls V: Skyrim" })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
            });
        });

        describe('PUT /api/games/:id', () => {
            it('should update a game', (done) => {
                request(server)
                .put('/api/games/5')
                .send({ "genre": "Action-Adventure" })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
            });
            it('should not update a game', (done) => {
                request(server)
                .put('/api/games/3')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500, done);
            });
            it('should have all required fields', (done) => {
                request(server)
                .put('/api/games/4')
                .send({ "title": null })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500, done);
            });
        });

        describe('DELETE /api/games/:id', () => {
            it('should remove a game', (done) => {
                request(server)
                .delete('/api/games/2')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
            });
            it('should return not found', (done) => {
                request(server)
                .delete('/api/games/8')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(404)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
            });
            it('should ignore body', (done) => {
                request(server)
                .delete('/api/games/4')
                .send({ "test": "pass" })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
            });
        });
    });
});