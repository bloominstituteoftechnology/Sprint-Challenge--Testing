const mongoose = require('mongoose');
const supertest = require('supertest');
const express = require('express');
const server = require('./server');
const Game = require('../games/Game');

const gameObj = {
    title: 'California Games',
    genre: 'Sports',
    releaseDate: 'June 1987'
}

describe('Game', () => {
    beforeAll(() => {
        return mongoose
            .connect('mongodb://localhost/sprintDB')
            .then(console.log('Connected to database'))
    });

    beforeEach(() => {
        // const savedGame = await Game.create({
        //     title: 'California Games',
        //     genre: 'Sports',
        //     releaseDate: 'June 1987'
        // });
    });

    afterEach(() => {
        // await Game.remove();
        return Game.remove();
    });

    afterAll(() => {
        return mongoose.disconnect();
    });

//Does it run tests?

    it('runs tests', () => {});

//Does it run GET requests?

    it('should return status 200', async () => {
        const response = await supertest(server)
            .get('/api/games')
        });
        
    it('should return an array with game objects, and the first object should be the initial gameObj object', async () => {
        const game = await supertest(server).get('/api/games')
            expect(game.body[0]).toMatchObject(game)
            expect(status).toEqual(200)
    });

//Does it run POST requests?

    it('should return status 201', async () => {
        const game = await supertest(server).post('/api/games').send(gameObj)
        expect(game.status).toBe(201)
    });

    it('should return status 500 if request is incomplete', async () => {
        const game = await supertest(server)
            .post('/api/games')
            .send({
                title: 'Monopoly', releasedYear: 'How-to-ruin-a-friendship'
            })
        expect(game.status).toBe(500)
    });

//Does it run DELETE requests?

    it('should return 204 if the object was deleted', async () => {
        const game = { 
            title: 'Pokemon',
            genre: 'Childhood favorite'
        };
        const deleted = await Game.remove(game);
        expect(deleted.title).not.toEqual(game);
        expect(deleted.genre).not.toEqual(game);
    });
})
