const request = require("supertest");

const server = require("./api/server.js");

const fakeDb = require("./data/fakeDb.js");

describe("server", () => {
    // Sanity check
    it("should return something with status code 200", async () => {
        const response = await request(server).get("/");
        expect(response).toBeTruthy();
        expect(response.status).toBe(200);
    });
});

describe("games/get", () => {

    it("should return an array", async () => {
        const response = await request(server).get("/api/games");
        expect(response).toBeTruthy();
        expect(response).toBe(200);
        expect(Array.isArray(response)).toBeTruthy();
    });

    it("should return status code 200", async () => {
        const response = await request(server).get("/api/games");
        expect(response.status).toBe(200);
    });

});