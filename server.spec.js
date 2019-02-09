const request = require("supertest");
const server = require("./server.js");

describe("GET route for '/games'", () => {
    it("returns status 200", async () => {
        
    });
    it("returns empty array if no games are stored", async () => {
        
    });
    it("returns array of all games stored", async () => {
        
    });
});

describe("POST route for '/games'", () => {
    it("returns status 422 if sent invalid data", async () => {
        
    });
    it("returns error message if sent invalid data", async () => {
        
    });
    it("returns status 201 if data posts successfully", async () => {

    });
    it("returns new item id if data posts successfully", async () => {

    });
});