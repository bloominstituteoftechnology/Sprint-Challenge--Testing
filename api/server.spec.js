const server = require('./server.js')
const request = require('supertest');


    describe('GET /games', () =>{
        it('should return 200 OK', () =>{
           return request(server)
            .get('/games')
            .then(res=>{
                expect(res.status).toBe(200)
            })
        })

        it('should return 200 OK using the squad', async() =>{
            const res = await request(server).get('/games')

            expect(res.status).toBe(200)
        })

        it('should return JSON', async() =>{
            const res = await request(server).get('/games')
            expect(res.type).toBe('application/json')
        })

        it('should return []', async () =>{
            const res = await request(server).get('/games')
            expect(res.body).toEqual([])
        })
        
    })

    
