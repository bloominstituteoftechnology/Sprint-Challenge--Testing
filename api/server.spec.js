const request = require('supertest');
const server = require('./server');

describe('POST /games', ()=>{
    //Test1
    it('should include proper fields; returns 422 if incomplete', async ()=>{

        let gameBody = {
            title: 'Pacman',
            genre: '',
            releaseYear: 1980 
        }
        let response = await request(server).post('/games').send(gameBody)

        expect(response.status).toBe(422)
    })
    //Test2
    it('should return 200 if complete', async ()=>{
        let gameBody = {
            title: 'Pacman', 
            genre: 'Arcade', 
            releaseYear: 1980 
        }
        let response = await request(server).post('/games').send(gameBody2);

        expect(response.status).toBe(200)
    })
})

describe('Get /games', () =>{
    //Test3
    it('should return list of games w/ proper status code', async () => {
        let responce = await request(server).get('games');
        let gameArray = [
            {
                title: 'Packman',
                genre: 'Arcade',
                releaseYear: 1980
            },
            {
                title: 'Shadow of Colossus',
                genre: 'Action-Adventure',
                releaseYear: 2005
            }
        ]

        expect(responce.body).toEqual(gameArray)
        expect(responce.status).toBe(200)
    })
    //Test4
    it('should always return an array', async () => {
        let response = await request(server).get('/games');
        expect(Array.isArray(response.body)).toBeTruthy();
    });
})
