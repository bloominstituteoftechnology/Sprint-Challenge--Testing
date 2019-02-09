const request = require("supertest");
const server = require("./server.js");

describe("GET route for '/games' while empty", () => {
    it("returns status 200", async () => {
        const response = await request(server).get("/games");
        expect(response.status).toBe(200);
    });
    it("returns empty array if no games are stored", async () => {
        const response = await request(server).get("/games");
        expect(response.body).toBe([]);
    });
});

describe("POST route for '/games'", () => {
    it("returns status 422 if sent invalid data", async () => {
        const response = await request(server).post("/games").send({invalid: "data"});
        expect(response.status).toBe(422);
    });
    it("returns error message if sent invalid data", async () => {
        const response = await request(server).post("/games").send({invalid: "data"});
        expect(response.body).toBe({ error: "malformed game data" });
    });
    it("returns status 201 if data posts successfully", async () => {
        const response = await request(server).post("/games").send({
            title: "Red Dead Redemption 2",
            genre: "Third-Person Shooter",
            releaseYear: 2018
        });
        expect(response.status).toBe(201);
    });
    it("returns new item id if data posts successfully", async () => {
        const response = await request(server).post("/games").send({
            title: "Kingdom Hearts III",
            genre: "Action RPG",
            releaseYear: 2019
        });
        expect(response.body).toBe(2);
    });
});

describe("GET route for '/games' while populated", () => {
    it("returns array of all games stored", async () => {
        //should get back the games posted to it while testing post route (?)
        const response = await request(server).get("/games");
        expect(response.body.length).toBe(2);
    });
});