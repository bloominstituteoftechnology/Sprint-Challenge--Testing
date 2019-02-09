const db = require('../data/dbConfig');
const request = require("supertest");
const server = require("./server.js");


afterEach(async () => {
    await db("games").truncate();
  });

describe("the route handler", () => {
  describe("get /games", () => {

  })
  describe("post /games", () => {

  })
})