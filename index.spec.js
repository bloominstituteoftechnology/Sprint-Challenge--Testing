// dependencies
const request = require("supertest");

// internal imports
const server = require("./server");
const db = require("./data/dbConfig");

// clear table and reset ids before each test fires
beforeEach(async () => {
  await db("games").truncate();
});

describe("server.js", () => {
  // endpoint tests for sanity check
  describe("/", () => {
    it("should preserve my sanity by returning a 200 code", async () => {
      let response = await request(server).get("/");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ server: "running" });
    });
  });

  describe("/games POST route", () => {
    it("successfully adds a new game to the games db", async () => {
      //first prove it doesn't already exist
      let rows = await db("games").where({
        title: "Ocarina of Time"
      });
      expect(rows.length).toBe(0);

      //after inserting the new game, will exist in db
      await request(server)
        .post("/games")
        .send({ title: "Ocarina of Time", genre: "adventure" });
      rows = await db("games").where({ title: "Ocarina of Time" });
      expect(rows.length).toBe(1);
    });

    it("returns status 201 upon successful POST", async () => {
      let response = await request(server)
        .post("/games")
        .send({ title: "Ocarina of Time", genre: "adventure" });

      expect(response.status).toBe(201);
    });

    it("it returns status 422 if title or genre are missing from request", async () => {
      let response = await request(server)
        .post("/games")
        .send({ title: "Ocarina of Time" });
      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        message:
          "Please fill out at least title and genre fields before submitting"
      });
    });

    //stretch test
    it("returns status 405 if submitted game name already exists in db", async () => {
      await db("games").insert({
        title: "Ocarina of Time",
        genre: "adventure"
      });
      let response = await request(server)
        .post("/games")
        .send({ title: "Ocarina of Time", genre: "adventure" });
      expect(response.status).toBe(405);
      expect(response.body).toEqual({ message: "That game already exists." });
    });
  });

  describe("/games GET route", () => {
    it("returns an array", async () => {
      let response = await request(server).get("/games");
      expect(Array.isArray(response.body)).toBe(true);
    });

    it("returns an array containing the list of games in the db, if any exist", async () => {
      await db("games").insert({
        title: "Ocarina of Time",
        genre: "adventure"
      });
      let response = await request(server).get("/games");
      expect(response.body).toHaveLength(1);
    });

    it("returns status 200 upon successful request", async () => {
      let response = await request(server).get("/games");
      expect(response.status).toBe(200);
    });

    it("returns an empty array if no games exist in the db", async () => {
      let response = await request(server).get("/games");
      expect(response.body).toEqual([]);
    });
  });
});
