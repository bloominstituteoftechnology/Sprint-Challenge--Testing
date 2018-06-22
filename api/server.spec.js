const mongoose = require('mongoose');
const supertest = require('supertest');
const express = require('express');
const server = require('./server');
const Game = require('./games/Game');

const gameObj = {
    title: 'California Games',
    genre: 'Sports',
    releaseDate: 'June 1987'
}

describe('Game', () => {
    beforeAll(() => {
        .then(() => console.log('Disconnected from database'));
    });

    beforeEach(() => {});

    afterEach(() => {
        return Game.remove();
    });

    afterAll(() => {
        return mongoose.disconnect();
    })
})
